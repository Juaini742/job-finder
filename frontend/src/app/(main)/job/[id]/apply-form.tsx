import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useGetCvQuery } from "@/store/slices/cvSlice";
import { useAddApplicationMutation } from "@/store/slices/useApplicationSlice";
import { useGetUserQuery } from "@/store/slices/useUserSlice";
import { Loader } from "lucide-react";
import Link from "next/link";

interface Props {
  id: string | undefined;
}

export default function ApplyForm({ id }: Props) {
  const { toast } = useToast();
  const { data } = useGetCvQuery();
  const body = {
    jobId: id,
    cvId: data?.data?.id,
  };
  const [addApplication, { isLoading: isSubmitting }] =
    useAddApplicationMutation();
  const { refetch: refetchUser } = useGetUserQuery(undefined, {
    skip: false,
  });

  const onSubmit = async () => {
    await addApplication(body)
      .unwrap()
      .then(() => {
        toast({
          title: "success",
          description: "Application sent successfully",
        });
        refetchUser();
      })
      .catch((error) => {
        console.error(error);
        toast({
          variant: "destructive",
          title: "error",
          description: "Failed to send application",
        });
      });
  };

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">
        Please confirm your CV and click the &quot;Apply&quot; button to submit
        your application.
      </p>
      <div className="space-y-4 flex gap-2 items-center justify-between">
        <div className="flex-1">
          <label htmlFor="cv" className="block text-sm font-medium">
            Selected CV
          </label>
          <Input
            id="cv"
            value={data?.data?.fullName || "No CV Selected"}
            disabled
          />
        </div>
        <div className="">
          <Link href="/job-seeker/dashboard/profile/form">
            <Button variant="secondary">Update Cv</Button>
          </Link>
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Button onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              Applying...
            </span>
          ) : (
            "Apply"
          )}
        </Button>
      </div>
    </div>
  );
}

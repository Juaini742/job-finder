import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CvValues } from "@/lib/validation";
import { PlusCircle, XCircle } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

const initialValue = {
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  description: "",
};

export default function ExperienceInput() {
  const { control } = useFormContext<CvValues>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "experience",
  });

  const handleAddExperience = () => append(initialValue);

  const handleRemoveExperience = (index: number) => {
    remove(index);
  };

  const handleInputChange = (
    index: number,
    key: keyof typeof initialValue,
    value: string
  ) => {
    const updateExperience = { ...fields[index], [key]: value };
    update(index, updateExperience);
  };

  return (
    <div className="card p-6 shadow-md rounded-lg">
      <div className="flex justify-between">
        <div className="">
          <h2 className="text-lg font-bold mb-4">Experiences</h2>
          <p className="text-sm text-gray-600 mb-6">
            Define all of your experience
          </p>
        </div>
        <Button type="button" onClick={handleAddExperience} className="">
          <PlusCircle />
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {fields.map((item, index: number) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h2>Experience {index + 1}</h2>
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleRemoveExperience(index)}
                className="w-fit"
              >
                <XCircle />
              </Button>
            </div>
            <div className="">
              <Label>Company</Label>
              <Input
                type="text"
                value={item.company}
                onChange={(e) =>
                  handleInputChange(index, "company", e.target.value)
                }
                placeholder="Company"
              />
            </div>
            <div className="">
              <Label>Job</Label>
              <Input
                type="text"
                value={item.position}
                onChange={(e) =>
                  handleInputChange(index, "position", e.target.value)
                }
                placeholder="Job"
              />
            </div>
            <div className="flex gap-2 w-full">
              <div className="w-full">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={item.startDate}
                  onChange={(e) =>
                    handleInputChange(index, "startDate", e.target.value)
                  }
                />
              </div>
              <div className="w-full">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={item.endDate}
                  onChange={(e) =>
                    handleInputChange(index, "endDate", e.target.value)
                  }
                  placeholder="Job"
                />
              </div>
            </div>
            <div className="">
              <Label>Description</Label>
              <Input
                type="text"
                onChange={(e) =>
                  handleInputChange(index, "description", e.target.value)
                }
                placeholder="Job"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CvValues } from "@/lib/validation";
import { PlusCircle, XCircle } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

const initialValue = {
  degree: "",
  university: "",
  startDate: "",
  endDate: "",
};

export default function EducationInput() {
  const { control } = useFormContext<CvValues>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "education",
  });

  const handleAddEducation = () => append(initialValue);

  const handleRemoveEducation = (index: number) => {
    remove(index);
  };

  const handleInputChange = (
    index: number,
    key: keyof typeof initialValue,
    value: string
  ) => {
    const updateEducation = { ...fields[index], [key]: value };
    update(index, updateEducation);
  };

  return (
    <div className="card p-6 shadow-md rounded-lg">
      <div className="flex justify-between">
        <div className="">
          <h2 className="text-lg font-bold mb-4">Educaton</h2>
          <p className="text-sm text-gray-600 mb-6">
            Define all of your education
          </p>
        </div>
        <Button type="button" onClick={handleAddEducation} className="">
          <PlusCircle />
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {fields.map((item, index: number) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h2>Education {index + 1}</h2>
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleRemoveEducation(index)}
                className="w-fit"
              >
                <XCircle />
              </Button>
            </div>
            <div className="">
              <Label>Degree</Label>
              <Input
                type="text"
                value={item.degree}
                onChange={(e) =>
                  handleInputChange(index, "degree", e.target.value)
                }
                placeholder="Degree"
              />
            </div>
            <div className="">
              <Label>University</Label>
              <Input
                type="text"
                value={item.university}
                onChange={(e) =>
                  handleInputChange(index, "university", e.target.value)
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
          </div>
        ))}
      </div>
    </div>
  );
}

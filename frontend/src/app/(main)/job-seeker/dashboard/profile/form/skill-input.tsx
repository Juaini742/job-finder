/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CvValues } from "@/lib/validation";
import { PlusCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";

interface Props {
  setValue: UseFormSetValue<CvValues>;
}

interface Skills {
  category: string;
  items: string[];
}

export default function SkillInput({ setValue }: Props) {
  const [skill, setSkill] = useState<Skills[]>([
    {
      category: "",
      items: [],
    },
  ]);

  const handleAddCategory = () => {
    setSkill([...skill, { category: "", items: [] }]);
  };

  const handleRemoveCategory = () => {
    if (skill.length > 1) {
      const updatedSkills = skill.slice(0, -1);
      setSkill(updatedSkills);
      setValue("skills", updatedSkills);
    }
  };

  const handleCategoryChange = (index: number, value: string) => {
    const updatedSkills = [...skill];
    updatedSkills[index].category = value;
    setSkill(updatedSkills);
    setValue("skills", updatedSkills);
  };

  const handleAddItems = (index: number, value: string) => {
    const updateSkill = [...skill];
    updateSkill[index].items.push(value);
    setSkill(updateSkill);
    setValue("skills", updateSkill);
  };

  const handleRemoveItem = (index: number, itemIndex: number) => {
    const updatedSkills = [...skill];
    updatedSkills[index].items.slice(itemIndex, 1);
    setSkill(updatedSkills);
    setValue("skills", updatedSkills);
  };

  return (
    <div className="card p-6 shadow-md rounded-lg">
      <div className="flex justify-between">
        <div className="">
          <h2 className="text-lg font-bold mb-4">Skills</h2>
          <p className="text-sm text-gray-600 mb-6">
            Define all of your skills
          </p>
        </div>
        <Button type="button" onClick={handleAddCategory} className="">
          <PlusCircle />
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {skill.map((item, index: number) => (
          <div key={index}>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <h2>Skill {index + 1}</h2>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleRemoveCategory}
                  className="w-fit"
                >
                  <XCircle />
                </Button>
              </div>
              <Select
                onValueChange={(value: string) =>
                  handleCategoryChange(index, value)
                }
                value={item.category || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category of skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Programming">Programming</SelectItem>
                  <SelectItem value="Frameworks">Frameworks</SelectItem>
                  <SelectItem value="Tools">Tools</SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              <div className="">
                <Input
                  type="text"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value.trim()) {
                      handleAddItems(index, e.currentTarget.value.trim());
                      e.currentTarget.value = "";
                      e.preventDefault();
                    }
                  }}
                  placeholder="Enter your skill"
                />
              </div>
            </div>

            <div className="mt-2 space-y-2">
              {item.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center justify-between bg-gray-100 p-2 rounded"
                >
                  <span className="text-sm">{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index, itemIndex)}
                  >
                    <XCircle className="text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

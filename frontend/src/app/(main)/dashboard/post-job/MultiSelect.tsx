import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface MultiSelectProps {
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const jobTags = [
  { label: "Remote Work", value: "remote_work" },
  { label: "Full-time", value: "full_time" },
  { label: "Part-time", value: "part_time" },
  { label: "Freelance", value: "freelance" },
  { label: "Startup", value: "startup" },
  { label: "Corporate", value: "corporate" },
  { label: "Tech", value: "tech" },
  { label: "Finance", value: "finance" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Education", value: "education" },
  { label: "Marketing", value: "marketing" },
  { label: "Sales", value: "sales" },
  { label: "Engineering", value: "engineering" },
  { label: "Product Management", value: "product_management" },
  { label: "Design", value: "design" },
  { label: "Customer Support", value: "customer_support" },
  { label: "Data Science", value: "data_science" },
  { label: "AI & Machine Learning", value: "ai_ml" },
  { label: "Cybersecurity", value: "cybersecurity" },
  { label: "DevOps", value: "devops" },
  { label: "Human Resources", value: "human_resources" },
  { label: "Accounting", value: "accounting" },
  { label: "Legal", value: "legal" },
  { label: "Supply Chain", value: "supply_chain" },
  { label: "Operations", value: "operations" },
  { label: "Blockchain", value: "blockchain" },
  { label: "Mobile Development", value: "mobile_development" },
  { label: "SEO", value: "seo" },
  { label: "E-commerce", value: "ecommerce" },
];

export default function MultiSelect({
  selectedValues,
  onChange,
}: MultiSelectProps) {
  const [_currentSelection, setCurrentSelection] = useState<string>("");

  const addValue = (value: string) => {
    if (!selectedValues.includes(value)) {
      const newValues = [...selectedValues, value];
      onChange(newValues);
    }
  };

  const removeValue = (value: string) => {
    const newValues = selectedValues.filter((v) => v !== value);
    onChange(newValues);
  };

  return (
    <div className="space-y-2">
      <Select
        onValueChange={(value) => {
          setCurrentSelection(value);
          addValue(value);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select users to assign" />
        </SelectTrigger>
        <SelectContent>
          {jobTags.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex flex-wrap gap-2">
        {selectedValues.map((value) => (
          <Badge
            key={value}
            variant="secondary"
            className="flex items-center gap-2"
          >
            <span>{jobTags.find((item) => item.value === value)?.label}</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => removeValue(value)}
              className="p-0 text-red-500"
            >
              <X />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
}

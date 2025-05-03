// components/CategoryFilter.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const categories = ["all", "Shoes", "T-Shirts", "Shirts", "Jeans"];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get("category") || "all";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }

    router.push(`/search?${params.toString()}`);
  };

  return (
    <RadioGroup
      defaultValue={selected}
      onValueChange={handleChange}
      className="space-y-2"
    >
      {categories.map((cat) => (
        <div key={cat} className="flex items-center space-x-2">
          <RadioGroupItem value={cat} id={cat} />
          <Label htmlFor={cat}>{cat}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}

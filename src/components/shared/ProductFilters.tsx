"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Label } from "../ui/label";

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [selectedPrice, setSelectedPrice] = useState(
    searchParams.get("minPrice") || ""
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(
    searchParams.getAll("color") || []
  );

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedPrice) {
      const [min, max] = selectedPrice.split("-");
      params.set("minPrice", min);
      params.set("maxPrice", max);
    }

    selectedColors.forEach((color) => params.append("color", color));

    router.push(`/search?${params.toString()}`);
  };

  const priceOptions = [
    { label: "All", value: "all" },
    { label: "Under $50", value: "under50" },
    { label: "$50 – $100", value: "$50-$100" },
    { label: "$100 – $200", value: "$100-$200" },
    { label: "$200 – $300", value: "$200-$300" },
    { label: "Over $300", value: "over300" },
  ];
  return (
    <div className="space-y-4">
      <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
        {/* Your category options */}
      </RadioGroup>

      <RadioGroup value={selectedPrice} onValueChange={setSelectedPrice}>
        {priceOptions.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.value} />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>

      <div>
        {["red", "blue", "green"].map((color) => (
          <div key={color} className="flex items-center space-x-2">
            <Checkbox
              checked={selectedColors.includes(color)}
              onCheckedChange={() => handleColorChange(color)}
              id={color}
            />
            <label htmlFor={color}>{color}</label>
          </div>
        ))}
      </div>

      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
}

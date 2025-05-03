// components/PriceFilter.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const priceOptions = [
  { label: "All", value: "all" },
  { label: "Under $50", value: "under50" },
  { label: "$50 – $100", value: "50to100" },
  { label: "$100 – $200", value: "100to200" },
  { label: "Over $200", value: "over200" },
];

export default function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get("price") || "all";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("price");
    } else {
      params.set("price", value);
    }

    router.push(`/search?${params.toString()}`);
  };

  return (
    <RadioGroup
      defaultValue={selected}
      onValueChange={handleChange}
      className="space-y-2"
    >
      {priceOptions.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={option.value} />
          <Label htmlFor={option.value}>{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}

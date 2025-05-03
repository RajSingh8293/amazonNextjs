"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { getFiltereUrl } from "@/lib/utils";

type Props = {
  sortOrders: { value: string; name: string }[]; // change from object to array
  sort: string;
  params: {
    q?: string;
    category?: string;
    tag?: string;
    sort?: string;
    price?: string;
    rating?: string;
    page?: string;
  };
};
const Sortfilter = ({ sortOrders, sort, params }: Props) => {
  const router = useRouter();

  return (
    <div>
      <Select
        value={sort}
        onValueChange={(v) => {
          router.push(getFiltereUrl({ params, sort: v }));
        }}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue>
            Sort By :{" "}
            {sortOrders.find((s) => s.value === sort)?.name || "Default"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white">
          {sortOrders?.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sortfilter;

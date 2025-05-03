// "use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAllCategories } from "@/lib/actions/product.actions";

const SearchForm = async () => {
  const categories = await getAllCategories();

  return (
    <div className="w-full h-10">
      <form
        action="/search"
        method="GET"
        className="flex items-center h-full outline-0  overflow-hidden bg-white shadow   rounded"
      >
        <Select name="category">
          <SelectTrigger className="w-auto h-full  border-0 focus-visible:ring-0 focus-visible:ring-offset-0  shadow-none bg-gray-200 rounded-r-none border-r border-r-slate-100">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent className="bg-white  h-full">
            <SelectItem value="all">All</SelectItem>
            {categories.map((category: string) => (
              <SelectItem
                key={category}
                value={category}
                className="capitalize"
              >
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="search"
          name="k"
          className="border-0 h-full focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
          placeholder="Seach here..."
        />
        <Button
          type="submit"
          className="bg-[#F3A847] h-full rounded-l-none hover:bg-[#eca548]"
        >
          <Search className="text-gray-900 h-8 w-8" />
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;

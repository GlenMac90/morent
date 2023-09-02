"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import useFilterStore from "@/lib/store";

const SearchForm = () => {
  const [setSearch] = useFilterStore((state) => [state.setSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const carTitle = e.target.value;
    setSearch(carTitle);
  };

  return (
    <div className="w-full">
      <div className="space-y-0 lg:mr-[0.81rem] lg:pt-[2.56rem]">
        <Label className="hidden dark:bg-blue100">Search</Label>
        <>
          <Label
            htmlFor="search"
            className="hidden pb-7 text-[0.75rem] font-semibold not-italic leading-[1.125rem] text-blue100 lg:block"
          >
            SEARCH
          </Label>
          <Input
            onChange={handleInputChange}
            id="search"
            type="search"
            className="h-12 truncate border-blue50 bg-[url('/svg-icons/filterSearch.svg')] bg-[0.75rem_center] bg-no-repeat pl-12 text-[0.875rem] font-medium not-italic leading-[1.3125rem] tracking-[-0.0175rem] 
                      text-gray700 dark:border-gray800 dark:bg-gray850 dark:bg-[url('/svg-icons/darkFilterSearch.svg')] dark:text-blue100"
            placeholder="Search by car title"
          />
        </>
      </div>
    </div>
  );
};

export default SearchForm;

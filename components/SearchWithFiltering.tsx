import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

import { filter } from "@/public/svg-icons";
import SearchForm from "./SearchForm";
import FilteringContent from "./FilteringContent";

const SearchWithFiltering = () => {
  return (
    <div className="flex flex-row gap-4 px-6 pb-8 lg:w-[22.5rem] lg:flex-col lg:gap-[3.25rem] lg:px-8">
      <SearchForm />
      <div className="hidden lg:block">
        <FilteringContent />
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="h-12 w-12 shrink-0 border border-gray450 data-[state=open]:border-blue500 lg:hidden"
            size="icon"
          >
            <Image src={filter} width="24" height="24" alt="Filter" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[22.5rem]">
          <FilteringContent />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchWithFiltering;

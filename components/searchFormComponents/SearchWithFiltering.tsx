import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SearchForm from "./SearchForm";
import FilteringContent from "../FilteringContent";

const SearchWithFiltering = () => {
  return (
    <aside className="flex flex-row gap-4 bg-white0 px-6 pb-8 dark:bg-gray900 lg:w-[22.5rem] lg:flex-col lg:gap-[3.25rem] lg:px-8">
      <SearchForm />
      <FilteringContent desktopView={true} />
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="h-12 w-12 shrink-0 border border-gray450 bg-[url('/svg-icons/filter.svg')] bg-center bg-no-repeat 
              data-[state=open]:border-blue500 dark:border-gray800 dark:bg-[url('/svg-icons/darkFilter.svg')] lg:hidden"
            size="icon"
          />
        </DialogTrigger>
        <DialogContent className="max-w-[22.5rem]">
          <FilteringContent desktopView={false} />
        </DialogContent>
      </Dialog>
    </aside>
  );
};

export default SearchWithFiltering;

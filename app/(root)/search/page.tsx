import Link from "next/link";

import PickUpDropOffCard from "@/components/PickUpDropOffCard";
import SearchWithFiltering from "@/components/SearchWithFiltering";
import CarCard from "@/components/CarCard";
import ShowMoreCars from "@/components/ShowMoreCars";

const Page = () => {
  return (
    <>
      {/* // NOTE: This is a temporary nav link */}
      {/* // TODO: Remove this temporary nav link */}
      <div className="h-[5.75rem] bg-white0 px-6 py-8 lg:h-[6.25rem] lg:border-b lg:border-gray450">
        <Link href="/">Temp Home</Link>
      </div>
      <div className="flex flex-col lg:flex-row">
        <SearchWithFiltering />
        <div className="flex grow flex-col bg-white200 px-6 pb-[3.75rem] pt-6 sm:pb-0">
          <PickUpDropOffCard />
          <div
            className="mt-[3.75rem] grid grid-rows-1 gap-5 xs:flex-col xs:items-center xs:justify-center sm:grid-cols-2 md:mt-9 
              md:gap-8 xl:grid-cols-3 2xl:grid-cols-4"
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <CarCard key={i} id={i.toString()} />
            ))}
          </div>
          <ShowMoreCars />
        </div>
      </div>
    </>
  );
};

export default Page;

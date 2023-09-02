import FetchCarCard from "@/components/FetchCarCard";
import PickUpDropOffCard from "@/components/PickUpDropOffCard";
import SearchWithFiltering from "@/components/searchFormComponents/SearchWithFiltering";
import { getCarsByLocation } from "@/lib/actions/car.actions";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { location: string; from: string; to: string };
}) => {
  const location = searchParams.location;
  const availabilityFrom = new Date(searchParams.from);
  const availabilityTo = new Date(searchParams.to);
  const carData = await getCarsByLocation(location);
  // NOTE: https://github.com/vercel/next.js/issues/47447,
  // Warning: Only plain objects can be passed to Client Components from Server Components.
  const cars = JSON.parse(JSON.stringify(carData));

  return (
    <div className="flex flex-col pt-[5.75rem] lg:flex-row">
      <SearchWithFiltering />
      <div className="flex grow flex-col bg-white200 px-6 pb-[3.75rem] pt-6 dark:bg-gray950 sm:pb-0">
        <PickUpDropOffCard />
        <FetchCarCard
          cars={cars}
          availabilityFrom={availabilityFrom}
          availabilityTo={availabilityTo}
        />
      </div>
    </div>
  );
};

export default SearchPage;

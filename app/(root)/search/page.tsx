import PickUpDropOffCard from "@/components/PickUpDropOffCard";
import SearchWithFiltering from "@/components/SearchWithFiltering";
import CarCard from "@/components/CarCard";
import ShowMoreCars from "@/components/ShowMoreCars";
import { getCarsByLocation } from "@/lib/actions/car.actions";
import { CarParams } from "@/lib/interfaces";

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
        <PickUpDropOffCard
          searchLocation={location}
          availabilityFrom={availabilityFrom}
          availabilityTo={availabilityTo}
        />
        <div
          className="mt-[3.75rem] grid grid-rows-1 gap-5 xs:flex-col xs:items-center xs:justify-center sm:grid-cols-2 md:mt-9 
              md:gap-8 xl:grid-cols-3 2xl:grid-cols-4"
        >
          {cars &&
            cars.map((car: CarParams) => (
              <CarCard
                key={car._id}
                id={car._id}
                carData={car}
                availabilityFrom={availabilityFrom}
                availabilityTo={availabilityTo}
              />
            ))}
        </div>
        <ShowMoreCars />
      </div>
    </div>
  );
};

export default SearchPage;

'use client';

import { useEffect, useState } from 'react';

import useFilterStore from '@/lib/store';
import CarCard from '@/components/carCardComponents/CarCard';
import { CarParamsExtended } from '@/lib/interfaces';
import ShowMoreCars from './ShowMoreCars';
import { getCapacityAndCarType } from '@/utils/utility.clientFunctions';

const FetchCarCard = ({
  cars,
  availabilityFrom,
  availabilityTo,
}: {
  cars: CarParamsExtended[] | null;
  availabilityFrom: Date;
  availabilityTo: Date;
}) => {
  const [
    search,
    type,
    capacity,
    price,
    setTypeCounts,
    setCapacityCounts,
    setType,
    setCapacity,
    setPrice,
    setSearch,
  ] = useFilterStore((state) => [
    // NOTE from Zustand store
    state.search,
    state.type,
    state.capacity,
    state.price,
    state.setTypeCounts,
    state.setCapacityCounts,
    state.setType,
    state.setCapacity,
    state.setPrice,
    state.setSearch,
  ]);
  const [filteredCars, setFilteredCars] = useState<CarParamsExtended[] | null>(
    null
  );

  useEffect(() => {
    // NOTE when a user goes to the search page, the filters should be reset
    setType([]);
    setCapacity([]);
    setPrice([950]);
    setSearch('');
    // NOTE when a user goes to the search page, get the counts of Type and Capacity of cars
    const { carTypeMap, capacityMap } = getCapacityAndCarType(cars || []);
    setTypeCounts(carTypeMap);
    setCapacityCounts(capacityMap);
  }, [cars]);

  useEffect(() => {
    // NOTE: filter cars based on user input
    const filteredCars = cars?.filter((car) => {
      const carPrice = parseFloat(car?.rentPrice || '0');
      const carTitleMatches = car.carTitle
        .toLowerCase()
        .includes(search.toLowerCase());
      const typeMatches = type.length === 0 || type.includes(car.carType);
      const capacityMatches =
        capacity.length === 0 || capacity.includes(car?.capacity || '');
      const priceMatches = price ? carPrice <= price[0] : true;

      return carTitleMatches && typeMatches && capacityMatches && priceMatches;
    });
    setFilteredCars(filteredCars || []);
  }, [cars, search, type, capacity, price]);

  return (
    <main>
      <div
        className="mt-[3.75rem] grid grid-rows-1 gap-5 xs:flex-col xs:items-center xs:justify-center sm:grid-cols-2 md:mt-9 
            md:gap-8 xl:grid-cols-3"
      >
        {filteredCars &&
          filteredCars
            .slice(0, 6)
            .map((car: CarParamsExtended) => (
              <CarCard
                key={car._id}
                carData={car}
                availabilityFrom={availabilityFrom}
                availabilityTo={availabilityTo}
              />
            ))}
      </div>
      {/* NOTE If cars are more than 6, show the ShowMoreCars component */}
      {filteredCars && filteredCars?.length > 6 ? (
        <ShowMoreCars
          availabilityFrom={availabilityFrom}
          availabilityTo={availabilityTo}
          filteredCars={filteredCars}
          carNumbers={filteredCars?.length}
        />
      ) : (
        filteredCars?.length === 0 && (
          <div className="flex h-[10rem] items-center justify-center">
            <h1 className="text-[1.5rem] text-gray400">No cars found</h1>
          </div>
        )
      )}
    </main>
  );
};

export default FetchCarCard;

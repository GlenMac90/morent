"use client";

import React, { useState } from "react";
import CarCard from "../carCardComponents/CarCard";

interface RentedCarsProps {
  rentedCars: string;
}

const RentedCars: React.FC<RentedCarsProps> = ({ rentedCars }) => {
  const [showMore, setShowMore] = useState(false);
  const parsedRentedCars = JSON.parse(rentedCars);
  return (
    <>
      <div className="flex w-full justify-between">
        <p className="mt-10 font-medium text-gray400">Rented Cars</p>
        <p
          className="mt-10 cursor-pointer font-medium text-gray400"
          onClick={() => setShowMore((prev) => !prev)}
        >
          {showMore ? "See Less" : "See More"}
        </p>
      </div>

      <section className="mt-7 flex flex-col items-center gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {showMore
          ? parsedRentedCars?.map((car) => (
              <CarCard
                carData={car}
                key={car._id}
                canReview={true}
                availabilityFrom={car.availabilityFrom}
                availabilityTo={car.availabilityTo}
              />
            ))
          : parsedRentedCars
              ?.slice(0, 4)
              .map((car) => (
                <CarCard
                  carData={car}
                  key={car._id}
                  canReview={true}
                  availabilityFrom={car.availabilityFrom}
                  availabilityTo={car.availabilityTo}
                />
              ))}
      </section>
    </>
  );
};

export default RentedCars;

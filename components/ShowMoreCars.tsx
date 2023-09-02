"use client";

import { useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import CarCard from "@/components/carCardComponents/CarCard";
import { CarParams } from "@/lib/interfaces";

const ShowMoreCars = ({
  filteredCars,
  carNumbers,
  availabilityTo,
  availabilityFrom,
}: {
  filteredCars: CarParams[];
  carNumbers: number;
  availabilityTo: Date;
  availabilityFrom: Date;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const isClickedHideButton = isClicked && "hidden";
  const isClickedAddMarginBottom = isClicked && "md:mb-8";

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="justify-center space-y-2 md:flex md:flex-col"
    >
      <CollapsibleContent
        className={`${isClickedAddMarginBottom} CollapsibleContent mt-5 grid grid-rows-1 gap-5 xs:flex-col xs:items-center 
          xs:justify-center sm:grid-cols-2 md:mt-9 md:gap-8 xl:grid-cols-3`}
      >
        {filteredCars &&
          filteredCars
            .slice(6, carNumbers)
            .map((car: CarParams) => (
              <CarCard
                key={car._id}
                id={car._id}
                carData={car}
                availabilityFrom={availabilityFrom}
                availabilityTo={availabilityTo}
              />
            ))}
      </CollapsibleContent>
      <div className="flex items-center justify-center space-x-4 px-4">
        <CollapsibleTrigger asChild>
          <Button
            onClick={() => setIsClicked(true)}
            className={`mt-8 h-10 rounded-[0.25rem] bg-blue500 px-4 sm:mb-12 sm:h-14 sm:w-[14.25rem] sm:rounded-[0.625rem] ${isClickedHideButton}`}
          >
            <span className="text-[0.75rem] font-semibold leading-normal text-white0 sm:text-[1rem] sm:font-bold">
              Show More Cars
            </span>
          </Button>
        </CollapsibleTrigger>
      </div>
    </Collapsible>
  );
};

export default ShowMoreCars;

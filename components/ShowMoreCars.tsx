"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import CarCard from "@/components/CarCard";

const ShowMoreCars = () => {
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
          xs:justify-center sm:grid-cols-2 md:mt-9 md:gap-8 xl:grid-cols-3 2xl:grid-cols-4`}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <CarCard key={i} id={i.toString()} />
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

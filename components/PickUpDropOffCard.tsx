"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import "@geoapify/geocoder-autocomplete/styles/round-borders.css";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

import { Card, CardContent } from "./ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Location from "./Location";
import { ellipse, search } from "@/public/svg-icons";
import AvailabilityFromTo from "./AvailabilityFromTo";

const PickUpDropOffCard = ({
  availabilityFrom,
  availabilityTo,
  searchLocation,
}: {
  availabilityFrom?: Date;
  availabilityTo?: Date;
  searchLocation?: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [location, setLocation] = useState("");
  // Set date from the handleSelected function
  const [date, setDate] = useState<DateRange>();

  // if date is undefined, set default date to today and 2 days from now
  const dateFrom = date?.from ?? new Date();
  const dateTo = date?.to ?? addDays(new Date(), 2);

  const handleUserInput = (input: string) => {
    setLocation(input);
  };

  const handleSearch = () => {
    router.push(`/search?location=${location}&from=${dateFrom}&to=${dateTo}`);
  };

  const handleSelectedDate = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
  };

  const isSearchPage = pathname === "/search";
  const searchPageDiv = isSearchPage ? "xl:px-7" : "xl:px-6";
  const searchPageLocation = isSearchPage && "xl:max-w-[17rem] 2xl:max-w-none";
  const searchPageButton = isSearchPage
    ? "h-14 w-[3.75rem] xl:flex hidden"
    : "flex h-12 grow flex-row gap-[0.38rem] xl:h-14 xl:max-w-[10rem]";

  return (
    <motion.div
      animate={{ scale: 1 }}
      initial={{ scale: 0 }}
      className={`flex w-full flex-col gap-5 dark:text-white0 xl:mx-0 xl:max-w-none xl:flex-row xl:gap-4 xl:rounded-[0.625rem] xl:bg-white0 dark:xl:bg-gray850 ${searchPageDiv}`}
    >
      <Card className="border-0 bg-none shadow-none xl:shrink-0 xl:grow">
        <CardContent
          className={`flex flex-col gap-[1.38rem] rounded-[0.625rem] bg-white0 px-3 pb-[1.56rem] pt-[1.44rem] dark:bg-gray850 xl:flex-row xl:gap-4 xl:px-0 xl:py-6`}
        >
          {/* Location */}
          <div className={`flex flex-col gap-3 xl:grow ${searchPageLocation}`}>
            <div className="flex flex-row items-center gap-2">
              <div className="flex h-[17px] w-[17px] items-center justify-center rounded-[4.375rem] bg-blue450">
                <Image src={ellipse} width={8} height={8} alt="Ellipse" />
              </div>
              <Label htmlFor="location">Location</Label>
            </div>
            <Location
              onUserInput={handleUserInput}
              searchLocation={searchLocation}
            />
          </div>
          <AvailabilityFromTo
            onSelectedDate={handleSelectedDate}
            availabilityFrom={availabilityFrom}
            availabilityTo={availabilityTo}
          />
        </CardContent>
      </Card>
      {/* Search Button on homepage */}
      <Button
        className={`${searchPageButton} rounded-[0.625rem] bg-blue500 xl:mt-[3.26rem]`}
        onClick={handleSearch}
      >
        <Image src={search} width={14} height={14} alt="Search" />
        <span className="text-[0.875rem] font-semibold not-italic leading-[1.6625rem] text-white0 xl:text-[1rem] xl:font-medium xl:leading-[1.6rem]">
          {isSearchPage ? "" : "Search"}
        </span>
      </Button>
      {/* Search button on search Page */}
      {isSearchPage && (
        <Button
          className={`${
            isSearchPage ? "xl:hidden" : "xl:max-w-[10rem]"
          } flex h-12 grow flex-row gap-[0.38rem] rounded-[0.625rem] bg-blue500 xl:mt-[3.26rem] xl:h-14`}
        >
          <Image src={search} width={14} height={14} alt="Search" />
          <span className="text-[0.875rem] font-semibold not-italic leading-[1.6625rem] text-white0 xl:text-[1rem] xl:font-medium xl:leading-[1.6rem]">
            Search
          </span>
        </Button>
      )}
    </motion.div>
  );
};

export default PickUpDropOffCard;

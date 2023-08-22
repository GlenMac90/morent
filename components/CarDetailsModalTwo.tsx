"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { DateRange } from "react-day-picker";
import { format, addDays } from "date-fns";

import SelectYourTime from "./SelectYourTime";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  cross,
  calendar,
  whiteCross,
  ellipse,
  arrowDown,
  darkModeArrowDown,
} from "../public/svg-icons/index";
import Location from "./Location";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface CarDetailsModalTwoProps {
  id: string;
  setShowModal: (show: boolean) => void;
}

const CarDetailsModalTwo: React.FC<CarDetailsModalTwoProps> = ({
  id,
  setShowModal,
}) => {
  const { theme } = useTheme();

  const today = new Date();
  const twoDaysFromNow = addDays(today, 2);

  const [date, setDate] = useState<DateRange | undefined>({
    from: twoDaysFromNow,
    to: addDays(twoDaysFromNow, 3),
  });
  return (
    <motion.section
      animate={{ scale: 1 }}
      initial={{ scale: 0 }}
      className="w-full flex-1 flex-col self-center py-6 xs:min-w-[22rem] sm:w-[31.25rem] sm:p-2"
    >
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="text-xl font-semibold text-gray900 dark:text-white">
            Add Pickup & Drop-Off Info
          </p>
          <p className="mt-2.5 text-sm text-gray400">Please enter your info</p>
        </div>
        <Image
          src={theme === "light" ? cross : whiteCross}
          alt="close modal"
          onClick={() => setShowModal(false)}
          className="flex h-6 w-6 -translate-y-6 cursor-pointer self-start sm:h-8 sm:w-8 sm:-translate-y-0"
        />
      </div>
      {/* <p className="mt-10 text-lg font-bold text-blue500">PICKUP INFO</p> */}
      <div className="mb-3 mt-[1.88rem] flex flex-row items-center gap-2">
        <div className="flex h-4 w-4 items-center justify-center rounded-[4.375rem] bg-blue450">
          <Image src={ellipse} width={8} height={8} alt="Ellipse" />
        </div>
        <p className="font-medium text-gray900 dark:text-white">
          Pick-Up Location
        </p>
      </div>
      {/* <input
        className="mt-3 w-full rounded-lg bg-white200 py-3.5 pl-6 text-sm dark:bg-gray800 dark:placeholder:text-white200"
        placeholder="Location Address"
      /> */}
      <Location />
      {/* <div className="mt-6 flex flex-col sm:flex-row sm:gap-2.5">
        <div className="flex w-full flex-col">
          <div className="flex">
            <Image src={calendar} alt="calender-icon" height={16} width={16} />
            <p className="ml-1.5">Availability From</p>
          </div>
          <input
            className="mt-3 w-full rounded-lg bg-white200 py-3.5 pl-6 text-sm dark:bg-gray800 dark:placeholder:text-white200"
            placeholder="Select your date"
          />
        </div>
        <div className="flex w-full flex-col">
          <div className="mt-2 flex sm:mt-0">
            <Image src={calendar} alt="calender-icon" height={16} width={16} />
            <p className="ml-1.5">Availability To</p>
          </div>
          <input
            className="mt-3 w-full rounded-lg bg-white200 py-3.5 pl-6 text-sm dark:bg-gray800 dark:placeholder:text-white200"
            placeholder="Select your date"
          />
        </div>
      </div> */}
      <div className="mt-6 flex flex-row gap-3 xl:grow xl:gap-4">
        <Popover>
          <div className={`flex w-full flex-col gap-3.5`}>
            <div className="flex flex-row">
              <div className="flex flex-row items-center gap-[0.38rem]">
                <Image src={calendar} width={14} height={14} alt="calendar" />
                <Label htmlFor="Pick-Up Date">Pick-Up Date</Label>
              </div>
            </div>
            <PopoverTrigger asChild id="Pick-Up Date">
              <Button
                variant={"outline"}
                className={cn(
                  "bg-white200 dark:bg-gray800 h-[2.875rem] sm:h-[3.5rem] w-full justify-between border-0 text-left font-normal py-[0.69rem] px-[0.62rem] xl:pl-[1.13rem] xl:h-14",
                  !date && "text-muted-foreground"
                )}
              >
                {date?.from ? (
                  format(date.from, "LLL dd, y")
                ) : (
                  <>
                    <span className="text-[0.625rem] font-normal leading-5 text-gray-400">
                      Select your date
                    </span>
                    <Image
                      className="dark:hidden"
                      src={arrowDown}
                      width="12"
                      height="12"
                      alt="Arrow Down"
                    />
                    <Image
                      className="hidden dark:block"
                      src={darkModeArrowDown}
                      width="12"
                      height="12"
                      alt="Arrow Down"
                    />
                  </>
                )}
              </Button>
            </PopoverTrigger>
          </div>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode={"range"}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <SelectYourTime pickUpOrDropOff={"Pick-Up Time"} />
      </div>

      <div className="mt-6 flex flex-row gap-3 xl:grow xl:gap-4">
        <Popover>
          <div className={`flex w-full flex-col gap-3.5`}>
            <div className="flex flex-row">
              <div className="flex flex-row items-center gap-[0.38rem]">
                <Image src={calendar} width={14} height={14} alt="calender" />
                <Label htmlFor="Drop-Off Date">Drop-Off Date</Label>
              </div>
            </div>
            <PopoverTrigger asChild id="Drop-Off Date">
              <Button
                variant={"outline"}
                className={cn(
                  "bg-white200 w-full dark:bg-gray800 h-[2.875rem] sm:h-[3.5rem] justify-between border-0 text-left font-normal py-[0.69rem] px-[0.62rem] xl:pl-[1.13rem] xl:h-14",
                  !date && "text-muted-foreground"
                )}
              >
                {date?.to ? (
                  format(date.to, "LLL dd, y")
                ) : (
                  <>
                    <span className="text-[0.625rem] font-normal leading-5 text-gray-400">
                      Select your date
                    </span>
                    <Image
                      className="dark:hidden"
                      src={arrowDown}
                      width="12"
                      height="12"
                      alt="Arrow Down"
                    />
                    <Image
                      className="hidden dark:block"
                      src={darkModeArrowDown}
                      width="12"
                      height="12"
                      alt="Arrow Down"
                    />
                  </>
                )}
              </Button>
            </PopoverTrigger>
          </div>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode={"range"}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <SelectYourTime pickUpOrDropOff={"Drop-Off Time"} />
      </div>
      <button className="mt-7 w-full rounded-xl bg-blue500 py-4 font-semibold text-white">
        Rent Now
      </button>
    </motion.section>
  );
};

export default CarDetailsModalTwo;

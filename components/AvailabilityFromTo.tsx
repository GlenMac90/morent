"use client";

import { useState } from "react";
import { format, addDays } from "date-fns";
import Image from "next/image";
import { DateRange } from "react-day-picker";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { calendar } from "@/public/svg-icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ArrowDown from "./ArrowDown";

const AvailabilityFromTo = () => {
  const today = new Date();
  const twoDaysFromNow = addDays(today, 2);

  const [date, setDate] = useState<DateRange | undefined>({
    from: twoDaysFromNow,
    to: addDays(twoDaysFromNow, 3),
  });
  return (
    <>
      <div className="flex flex-row gap-3 xl:grow xl:gap-4">
        <Popover>
          <div className={`flex w-full flex-col gap-3.5`}>
            <div className="flex flex-row">
              <div className="flex flex-row items-center gap-[0.38rem]">
                <Image src={calendar} width={14} height={14} alt="calendar" />
                <Label htmlFor="availabilityFrom">Availability from</Label>
              </div>
            </div>
            <PopoverTrigger asChild id="availabilityFrom">
              <Button
                variant={"outline"}
                className={cn(
                  "bg-white200 dark:bg-gray800 w-full h-[2.875rem] sm:h-[3.5rem] justify-between border-0 text-left font-normal py-[0.69rem] pl-4 pr-[1.13rem] xl:px-5 xl:h-14",
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
                    <ArrowDown />
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
      </div>

      <div className="flex flex-row gap-3 xl:grow xl:gap-4">
        <Popover>
          <div className={`flex w-full flex-col gap-3.5`}>
            <div className="flex flex-row">
              <div className="flex flex-row items-center gap-[0.38rem]">
                <Image src={calendar} width={14} height={14} alt="calender" />
                <Label htmlFor="availabilityTo">Availability to</Label>
              </div>
            </div>
            <PopoverTrigger asChild id="availabilityTo">
              <Button
                variant={"outline"}
                className={cn(
                  "bg-white200 w-full dark:bg-gray800 h-[2.875rem] sm:h-[3.5rem] justify-between border-0 text-left font-normal py-[0.69rem] xl:px-5 pl-4 pr-[1.13rem] xl:h-14",
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
                    <ArrowDown />
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
      </div>
    </>
  );
};

export default AvailabilityFromTo;

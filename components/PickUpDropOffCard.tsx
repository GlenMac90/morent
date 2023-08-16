"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SelectYourTime from "./SelectYourTime";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import "@geoapify/geocoder-autocomplete/styles/round-borders.css";
import Location from "./Location";
import { usePathname } from "next/navigation";

const PickUpDropOffCard = () => {
  const pathname = usePathname();
  const today = new Date();
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(today.getDate() + 2);
  const [date, setDate] = useState<DateRange | undefined>({
    from: threeDaysFromNow,
    to: addDays(threeDaysFromNow, 3),
  });

  const searchPageDiv = pathname === "/search" ? "xl:px-6" : "xl:px-9";

  const searchPageLocation =
    pathname === "/search" && "xl:max-w-[10.75rem] 2xl:max-w-none";

  const searchPageFlexDirection =
    pathname === "/search" ? "xl:flex-row" : "xl:flex-row";

  const searchPageButton =
    pathname === "/search"
      ? "h-14 w-[3.75rem] xl:flex hidden"
      : "flex h-12 grow flex-row gap-[0.38rem] xl:h-14 xl:max-w-[10rem]";

  return (
    <div
      className={`2xl:mx-auto 2xl:max-w-[90rem] flex flex-col gap-5 dark:text-white0 md:mx-auto md:max-w-xl xl:mx-0 xl:max-w-none xl:gap-4 xl:rounded-[0.625rem] xl:bg-white0 dark:xl:bg-gray850 ${searchPageFlexDirection} ${searchPageDiv}`}
    >
      <Card className="border-0 bg-none shadow-none xl:shrink-0 xl:grow">
        <CardContent
          className={`flex flex-col gap-[1.38rem] rounded-[0.625rem] bg-white0 px-3 pb-[1.56rem] pt-[1.44rem] dark:bg-gray850 xl:gap-4 xl:px-0 xl:py-6 ${searchPageFlexDirection}`}
        >
          {/* Location */}
          <div className={`flex flex-col gap-3 xl:grow ${searchPageLocation}`}>
            <div className="flex flex-row items-center gap-2">
              <div className="flex h-4 w-4 items-center justify-center rounded-[4.375rem] bg-blue450">
                <Image
                  src="/images/ellipse.svg"
                  width={8}
                  height={8}
                  alt="Ellipse"
                />
              </div>
              <Label htmlFor="location">Location</Label>
            </div>
            <Location />
          </div>

          <div className="flex flex-row gap-3 xl:grow xl:gap-4">
            <Popover>
              <div className={`flex w-full flex-col gap-3.5`}>
                <div className="flex flex-row">
                  <div className="flex flex-row items-center gap-[0.38rem]">
                    <Image
                      src="/images/calendar.svg"
                      width={14}
                      height={14}
                      alt="calender"
                    />
                    <Label htmlFor="">Pick-Up Date</Label>
                  </div>
                </div>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "bg-white200 dark:bg-gray800 w-full justify-between border-0 text-left font-normal py-[0.69rem] px-[0.62rem] xl:pl-[1.13rem] xl:h-14",
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
                          src="images/arrowDown.svg"
                          width="12"
                          height="12"
                          alt="Arrow Down"
                        />
                        <Image
                          className="hidden dark:block"
                          src="images/darkModeArrowDown.svg"
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
            <SelectYourTime pickUpOrDropOff={"Pick-Up"} />
          </div>

          <div className="flex flex-row gap-3 xl:grow xl:gap-4">
            <Popover>
              <div className={`flex w-full flex-col gap-3.5`}>
                <div className="flex flex-row">
                  <div className="flex flex-row items-center gap-[0.38rem]">
                    <Image
                      src="/images/calendar.svg"
                      width={14}
                      height={14}
                      alt="calender"
                    />
                    <Label htmlFor="">Drop-Off Date</Label>
                  </div>
                </div>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "bg-white200 w-full dark:bg-gray800 justify-between border-0 text-left font-normal py-[0.69rem] px-[0.62rem] xl:pl-[1.13rem] xl:h-14",
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
                          src="images/arrowDown.svg"
                          width="12"
                          height="12"
                          alt="Arrow Down"
                        />
                        <Image
                          className="hidden dark:block"
                          src="images/darkModeArrowDown.svg"
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
            <SelectYourTime pickUpOrDropOff={"Drop-Off"} />
          </div>
        </CardContent>
      </Card>
      {/* Search Button on homepage */}
      <Button
        className={`${searchPageButton} rounded-[0.625rem] bg-blue500 xl:mt-[3.26rem]`}
      >
        <Image src="/images/search.svg" width={14} height={14} alt="Search" />
        <span className="text-[0.875rem] font-semibold not-italic leading-[1.6625rem] text-white0 xl:text-[1rem] xl:font-medium xl:leading-[1.6rem]">
          {pathname === "/search" ? "" : "Search"}
        </span>
      </Button>
      {/* Search button on search Page */}
      {pathname === "/search" && (
        <Button
          className={`${
            pathname === "/search" ? "xl:hidden" : "xl:max-w-[10rem]"
          } flex h-12 grow flex-row gap-[0.38rem] rounded-[0.625rem] bg-blue500 xl:mt-[3.26rem] xl:h-14`}
        >
          <Image src="/images/search.svg" width={14} height={14} alt="Search" />
          <span className="text-[0.875rem] font-semibold not-italic leading-[1.6625rem] text-white0 xl:text-[1rem] xl:font-medium xl:leading-[1.6rem]">
            Search
          </span>
        </Button>
      )}
    </div>
  );
};

export default PickUpDropOffCard;

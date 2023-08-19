'use client';

import { useState } from 'react';
import Image from 'next/image';
import { DateRange } from 'react-day-picker';
import { format, addDays } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { calendar } from '@/public/svg-icons';

const AvailableDates = () => {
  const today = new Date();
  const twoDaysFromNow = addDays(today, 2);

  const [date, setDate] = useState<DateRange | undefined>({
    from: twoDaysFromNow,
    to: addDays(twoDaysFromNow, 3),
  });

  const onDateChange = (newDate: DateRange | undefined) => {
    if (newDate) {
      console.log('Selected Date Range:', newDate);
      setDate(newDate);
    } else {
      console.log('Date selection cleared');
    }
  };

  return (
    <Popover>
      <div className={`flex w-full flex-col gap-3.5`}>
        <div className="flex flex-row">
          <div className="flex flex-row items-center gap-[0.38rem]">
            <Image src={calendar} width={14} height={14} alt="calendar" />
            <Label
              className="ml-4 flex h-11 items-center justify-center text-[1.05rem] font-medium  md:h-14 "
              htmlFor=""
            >
              Select dates your car is available for hire
            </Label>
          </div>
        </div>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'bg-white200 dark:bg-gray800 w-full justify-between border-0 text-left font-normal py-[0.69rem] px-[0.62rem] xl:pl-[1.13rem] xl:h-14',
              !date && 'text-muted-foreground'
            )}
          >
            {date?.from && date?.to
              ? `${format(date.from, 'LLL dd, y')} - ${format(
                  date.to,
                  'LLL dd, y'
                )}`
              : 'Select your date range'}
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode={'range'}
          selected={date}
          onSelect={(newDate) => {
            setDate(newDate);
            onDateChange(newDate);
          }}
          numberOfMonths={2}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default AvailableDates;

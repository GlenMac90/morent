import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";

const SelectYourTime = ({ pickUpOrDropOff }: { pickUpOrDropOff: string }) => {
  // Generate an array of time options with specific increments
  const timeOptions = [];
  // NOTE: ChatGPT generated the following code
  for (let hour = 0; hour <= 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 0 && minute === 0) {
        timeOptions.push("Midnight");
      } else if (hour === 12 && minute === 0) {
        timeOptions.push("Noon");
      } else {
        const amOrPm = hour < 12 ? "AM" : "PM";
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const timeOption = `${displayHour}:${
          minute === 0 ? "00" : minute
        } ${amOrPm}`;
        if (
          !(
            (displayHour === 12 && minute === 0) ||
            (displayHour === 12 && minute === 30)
          )
        ) {
          timeOptions.push(timeOption);
        } else if (displayHour === 12 && minute === 30 && amOrPm !== "PM") {
          timeOptions.push(`${displayHour}:${minute} ${amOrPm}`);
        }
      }
    }
  }
  return (
    <Select defaultValue="10:00 AM">
      <div className={`flex w-full flex-col gap-3.5`}>
        <div className="flex flex-row items-center gap-[0.38rem]">
          <Image src="/images/clock.svg" width={14} height={14} alt="Ellipse" />
          <Label htmlFor="">{pickUpOrDropOff} Time</Label>
        </div>
        <SelectTrigger className="border-0 bg-white200 text-sm font-normal dark:bg-gray800 xl:h-14 xl:pl-[1.13rem]">
          <SelectValue placeholder="Select your time" />
        </SelectTrigger>
      </div>
      <SelectContent>
        <ScrollArea className="h-[550px]">
          {timeOptions.map((timeOption) => (
            <SelectItem key={timeOption} value={timeOption}>
              {timeOption}
            </SelectItem>
          ))}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
};

export default SelectYourTime;

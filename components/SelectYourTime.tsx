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
import { clock } from "@/public/svg-icons";
import { timeOptions } from "@/constants";

const SelectYourTime = ({ pickUpOrDropOff }: { pickUpOrDropOff: string }) => {
  return (
    <Select defaultValue="10:00 AM">
      <div className="flex w-full flex-col gap-3.5">
        <div className="flex flex-row items-center gap-[0.38rem]">
          <Image src={clock} width={14} height={14} alt="Clock" />
          <Label htmlFor="timeSelect">{pickUpOrDropOff} Time</Label>
        </div>
        <SelectTrigger
          id="timeSelect"
          className="border-0 bg-white200 text-sm font-normal dark:bg-gray800 xl:h-14 xl:pl-[1.13rem]"
        >
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

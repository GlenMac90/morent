"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

import { typeFilters, capacityFilters } from "@/constants";

const DesktopFilteringContent = () => {
  const [price, setPrice] = useState([0]);

  const isMax = price[0] === 100 ? "MAX." : "";
  const dummyCountData = 10;

  return (
    <div className="hidden lg:flex lg:flex-col">
      <Label
        className="text-[0.75rem] font-semibold not-italic leading-[1.125rem] tracking-[0.15rem] text-blue100"
        htmlFor="type"
      >
        TYPE
      </Label>
      <div id="type" className="grid gap-[1.12rem] pb-9 pt-4 lg:gap-8 lg:pt-7">
        {typeFilters.map((typeFilter) => (
          <div key={typeFilter} className="flex flex-row gap-[0.38rem]">
            <div className="flex flex-row items-center gap-[0.38rem] lg:gap-2">
              <Checkbox id={`desktop-${typeFilter}`} />
              <Label
                className="text-[1rem] font-semibold not-italic leading-[1.4rem] tracking-[-0.02rem]"
                htmlFor={`desktop-${typeFilter}`}
              >
                {typeFilter}
              </Label>
            </div>
            <span className="text-[1rem] font-medium not-italic leading-[140%] tracking-[-0.02rem] text-gray400">
              {`(${dummyCountData})`}
            </span>
          </div>
        ))}
      </div>
      <Label
        className="text-[0.75rem] font-semibold not-italic leading-[1.125rem] tracking-[0.15rem] text-blue100"
        htmlFor="capacity"
      >
        CAPACITY
      </Label>
      <div
        id="capacity"
        className="grid gap-[1.12rem] py-4 pb-9 lg:gap-8 lg:pb-14 lg:pt-7"
      >
        {capacityFilters.map((capacityFilter) => (
          <div
            key={capacityFilter}
            className="flex flex-row items-center gap-[0.38rem]"
          >
            <Checkbox id={`desktop-${capacityFilter}`} />
            <Label
              className="text-[1rem] font-semibold not-italic leading-[1.4rem] tracking-[-0.02rem]"
              htmlFor={`desktop-${capacityFilter}`}
            >
              {capacityFilter}
            </Label>
            <span className="text-[1rem] font-medium not-italic leading-[140%] tracking-[-0.02rem] text-gray400">
              {`(${dummyCountData})`}
            </span>
          </div>
        ))}
      </div>
      <Label
        className="text-[0.75rem] font-semibold not-italic leading-[1.125rem] tracking-[0.15rem] text-blue100"
        htmlFor="price"
      >
        PRICE
      </Label>
      <Slider
        className="max-w-[18.5rem] py-4 lg:pb-3 lg:pt-7"
        id="price"
        defaultValue={[0]}
        max={100}
        step={1}
        onValueChange={setPrice}
      />
      <span className="text-[1rem] font-semibold not-italic leading-[1.4rem] tracking-[-0.02rem] text-gray700">
        {`${isMax} $${price}`}
      </span>
    </div>
  );
};

export default DesktopFilteringContent;

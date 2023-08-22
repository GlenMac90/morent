"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

const Filter = ({
  label,
  payload,
  count,
  desktopView,
}: {
  label: string;
  payload: string[] | null;
  count: number;
  desktopView: boolean;
}) => {
  const [price, setPrice] = useState([0]);

  const isMax = price[0] === 100 ? "MAX." : "";
  return (
    <>
      <Label
        className="text-[0.75rem] font-semibold uppercase not-italic leading-[1.125rem] tracking-[0.15rem] text-blue100"
        htmlFor={label}
      >
        {label}
      </Label>
      {label !== "price" ? (
        <div
          id={label}
          className="grid gap-[1.12rem] pb-9 pt-4 lg:gap-8 lg:pt-7"
        >
          {payload?.map((data) => (
            <div key={data} className="flex flex-row gap-[0.38rem]">
              <div className="flex flex-row items-center gap-[0.38rem] lg:gap-2">
                <Checkbox id={desktopView ? `desktop-${data}` : data} />
                <Label
                  className="text-[1rem] font-semibold not-italic leading-[1.4rem] tracking-[-0.02rem]"
                  htmlFor={desktopView ? `desktop-${data}` : data}
                >
                  {data}
                </Label>
              </div>
              <span className="text-[1rem] font-medium not-italic leading-[140%] tracking-[-0.02rem] text-gray400">
                {`(${count})`}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <>
          <Slider
            className="max-w-[18.5rem] py-4 lg:pb-3 lg:pt-7"
            id="price"
            defaultValue={[0]}
            max={100}
            step={1}
            onValueChange={setPrice}
          />
          <span className="text-[1rem] font-semibold not-italic leading-[1.4rem] tracking-[-0.02rem] text-gray700 dark:text-white0">
            {`${isMax} $${price}`}
          </span>
        </>
      )}
    </>
  );
};

export default Filter;

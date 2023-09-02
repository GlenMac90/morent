"use client";

import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import useFilterStore from "@/lib/store";

const Filter = ({
  label,
  payload,
  count,
  desktopView,
}: {
  label: string;
  payload: string[] | null;
  count: { [key: string]: number };
  desktopView: boolean;
}) => {
  const [price, type, capacity, setType, setCapacity, setPrice] =
    useFilterStore((state) => [
      state.price,
      state.type,
      state.capacity,
      state.setType,
      state.setCapacity,
      state.setPrice,
    ]);
  const isMax = price[0] === 999 ? "MAX." : "";

  const filterHandler = ({
    target: { checked, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (label === "type") {
      if (checked) {
        setType([...type, value]);
      } else {
        setType(type.filter((item: string) => item !== value));
      }
    } else if (label === "capacity") {
      if (checked) {
        setCapacity([...capacity, value]);
      } else {
        setCapacity(capacity.filter((item: string) => item !== value));
      }
    }
  };

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
                <input
                  className="peer h-[18px] w-[18px] appearance-none rounded-[5px] border border-gray400 bg-center bg-no-repeat checked:border-none checked:bg-[url('/svg-icons/checkBox.svg')]"
                  id={desktopView ? `desktop-${data}` : data}
                  value={data}
                  onChange={filterHandler}
                  type="checkbox"
                  checked={
                    label === "type"
                      ? type.includes(data)
                      : capacity.includes(data)
                  }
                />
                <Label
                  className="text-[1rem] font-semibold not-italic leading-[1.4rem] tracking-[-0.02rem]"
                  htmlFor={desktopView ? `desktop-${data}` : data}
                >
                  {label === "capacity"
                    ? data === "8"
                      ? data + " or More"
                      : data + " Person"
                    : data}
                </Label>
              </div>
              <span className="text-[1rem] font-medium not-italic leading-[140%] tracking-[-0.02rem] text-gray400">
                {`( ${Object.hasOwn(count, data) ? count[data] : 0} )`}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <>
          <Slider
            className="max-w-[18.5rem] py-4 lg:pb-3 lg:pt-7"
            id="price"
            defaultValue={[950]}
            max={999}
            step={10}
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

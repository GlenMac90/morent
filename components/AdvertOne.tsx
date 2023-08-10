import React from "react";
import Image from "next/image";

import advertWhiteCar from "../public/pngs/advertWhiteCar.png";

const AdvertOne: React.FC = () => {
  return (
    <div className="white_car_ad flex h-60 w-full flex-col justify-between rounded-xl px-6 pb-3 pt-6 sm:h-[22.5rem]">
      <div className="flex flex-col">
        <p className="w-full text-white sm:text-3xl lg:w-1/2">
          The Best Platform for Car Rental
        </p>
        <p className="mt-4 w-full text-xs text-white sm:text-base lg:w-1/2">
          Ease of doing a car rental safely and reliably. Of course at a low
          price.
        </p>
      </div>
      <Image
        src={advertWhiteCar}
        alt="White Car Advert"
        className="ml-6 h-14 w-48 self-center sm:h-[7.25rem] sm:w-[25.5rem]"
      />
    </div>
  );
};

export default AdvertOne;

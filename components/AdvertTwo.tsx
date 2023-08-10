import React from "react";
import Image from "next/image";

import advertSilverCar from "../public/pngs/advertSilverCar.png";

const AdvertTwo: React.FC = () => {
  return (
    <div className="black_car_ad hidden h-[22.5rem] w-full flex-col justify-between rounded-xl px-6 pb-4 pt-6 lg:flex">
      <div className="flex flex-col">
        <p className="w-full text-3xl text-white lg:w-1/2">
          Easy way to rent a car at a low price
        </p>
        <p className="mt-4 w-full text-white lg:w-1/2">
          Providing a cheap car rental services and safe and confortable
          facilities
        </p>
      </div>
      <Image
        src={advertSilverCar}
        alt="Silver Car Advert"
        className="ml-6 self-center"
        height={108}
      />
    </div>
  );
};

export default AdvertTwo;

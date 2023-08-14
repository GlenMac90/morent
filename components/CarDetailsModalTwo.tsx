import React from "react";
import Image from "next/image";

import { cross, calendar } from "../public/svg-icons/index";

interface CarDetailsModalTwoProps {
  setShowModal: (show: boolean) => void;
}

const CarDetailsModalTwo: React.FC<CarDetailsModalTwoProps> = ({
  setShowModal,
}) => {
  return (
    <section className="w-full flex-1 flex-col self-center py-6 xs:min-w-[21rem] sm:w-[31.25rem] sm:p-6">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="text-xl font-semibold text-gray900">
            Add Pickup Location
          </p>
          <p className="mt-2.5 text-sm text-gray400">
            Please enter your location info
          </p>
        </div>
        <Image
          src={cross}
          alt="close modal"
          onClick={() => setShowModal(false)}
          className="flex h-6 w-6 -translate-y-6 cursor-pointer self-start sm:h-8 sm:w-8 sm:-translate-y-0"
        />
      </div>
      <p className="mt-10 text-lg font-bold text-blue500">PICKUP INFO</p>
      <p className="mt-6 font-medium text-gray900">Pickup Location</p>
      <input
        className="mt-3 w-full rounded-lg bg-white200 py-3.5 pl-6 text-sm"
        placeholder="Location Address"
      />
      <div className="mt-6 flex flex-col sm:gap-2.5 md:flex-row">
        <div className="flex w-full flex-col">
          <div className="flex">
            <Image src={calendar} alt="calender-icon" height={16} width={16} />
            <p className="ml-1.5">Availability From</p>
          </div>
          <input
            className="mt-3 w-full rounded-lg bg-white200 py-3.5 pl-6 text-sm"
            placeholder="Select your date"
          />
        </div>
        <div className="flex w-full flex-col">
          <div className="mt-2 flex sm:mt-0">
            <Image src={calendar} alt="calender-icon" height={16} width={16} />
            <p className="ml-1.5">Availability To</p>
          </div>
          <input
            className="mt-3 w-full rounded-lg bg-white200 py-3.5 pl-6 text-sm"
            placeholder="Select your date"
          />
        </div>
      </div>
      <button className="mt-7 w-full rounded-xl bg-blue500 py-4 font-semibold text-white">
        Rent Now
      </button>
    </section>
  );
};

export default CarDetailsModalTwo;

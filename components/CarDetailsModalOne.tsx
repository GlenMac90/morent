import React, { useState } from "react";
import Image from "next/image";

import { cross } from "../public/svg-icons/index";

const CarDetailsModalOne = ({ data, setShowModal, isPopular }) => {
  const [displayPicture, setDisplayPicture] = useState(data.pictures[0]);

  return (
    <>
      <div
        className={`fixed inset-x-2 top-10 z-50 flex max-w-[25rem] flex-col rounded-lg bg-white p-5 xs:inset-x-auto sm:top-40 sm:self-center sm:justify-self-center md:max-w-[45rem] md:flex-row ${
          isPopular && "ml-5"
        }`}
      >
        <div className="flex flex-col">
          <div className="flex h-[12rem] items-center justify-center rounded-lg">
            <Image
              src={displayPicture}
              alt="main display picture"
              className="h-full w-full rounded-lg"
            />
          </div>
          <div className="no_scrollbar mt-5 flex gap-5 overflow-x-auto">
            {data.pictures.map((picture) => (
              <div className="w-1/3 rounded-lg" key={picture}>
                <Image
                  src={picture}
                  alt="car pictures"
                  className={`h-full rounded-lg p-[3px] ${
                    displayPicture === picture &&
                    "border border-blue-600 p-[1px]"
                  }`}
                  onClick={() => setDisplayPicture(picture)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col px-2 md:ml-10 md:mt-0 md:justify-evenly">
          <div className="flex justify-between">
            <p className="text-xl font-medium">{data.brand}</p>
            <Image
              src={cross}
              height={20}
              width={20}
              alt="close modal"
              onClick={() => setShowModal(false)}
            />
          </div>
          <p className="mt-2 text-xs leading-6 text-gray700">
            {data.shortDescription}
          </p>
          <div className="mt-4 flex justify-between gap-8">
            <div className="flex w-1/2 justify-between">
              <p className="text-xs text-gray400">Type Car</p>
              <p className="text-xs text-gray700">{data.type}</p>
            </div>
            <div className="flex w-1/2 justify-between">
              <p className="text-xs text-gray400">Capacity</p>
              <p className="text-xs text-gray700">
                {data.capacity} {data.capacity === 1 ? "person" : "people"}
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-between gap-8">
            <div className="flex w-1/2 justify-between">
              <p className="text-xs text-gray400">Transm.</p>
              <p className="text-xs text-gray700">{data.transmission}</p>
            </div>
            <div className="flex w-1/2 justify-between">
              <p className="text-xs text-gray400">Gasoline</p>
              <p className="text-xs text-gray700">{data.fuelCapacity}L</p>
            </div>
          </div>
          <div className="mt-8 flex w-full justify-between">
            <p className="self-center font-medium">
              ${data.rentPrice}/
              <span className="text-xs text-gray-400"> days</span>
            </p>
            <button className="rounded bg-blue500 px-6 py-2 font-medium text-white">
              Rent Now
            </button>
          </div>
        </div>
      </div>
      <div
        className="fixed inset-0 z-10 bg-black opacity-30 dark:bg-white  dark:opacity-10"
        onClick={() => setShowModal(false)}
      ></div>
    </>
  );
};

export default CarDetailsModalOne;

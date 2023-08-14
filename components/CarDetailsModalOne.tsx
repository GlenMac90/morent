"use client";

import React, { useState } from "react";
import Image from "next/image";

import { cross } from "../public/svg-icons/index";
import CarDetailsModalTwo from "./CarDetailsModalTwo";

interface CarData {
  pictures: string[];
  brand: string;
  shortDescription: string;
  type: string;
  capacity: number;
  transmission: string;
  fuelCapacity: number;
  rentPrice: number;
}

interface CarDetailsModalOneProps {
  data: CarData;
  setShowModal: (show: boolean) => void;
  isPopular?: boolean; // assuming isPopular might be optional
}

const CarDetailsModalOne: React.FC<CarDetailsModalOneProps> = ({
  data,
  setShowModal,
  isPopular,
}) => {
  const [displayPicture, setDisplayPicture] = useState(data.pictures[0]);
  const [showModalScreen2, setShowModalScreen2] = useState(false);

  return (
    <>
      <div
        className={`fixed inset-x-2 top-10 z-50 flex flex-col rounded-lg bg-white p-4 xs:inset-x-auto sm:top-40 sm:-translate-x-7 md:flex-row ${
          isPopular && ""
        } ${showModalScreen2 ? "" : "max-w-[25rem] md:max-w-[45rem]"}`}
      >
        {showModalScreen2 && <CarDetailsModalTwo setShowModal={setShowModal} />}
        <div
          className={`flex flex-col md:flex-row ${
            showModalScreen2 && "hidden"
          }`}
        >
          <div className="absolute -top-4 right-2 rounded-sm bg-white">
            <Image
              src={cross}
              height={20}
              width={20}
              alt="close modal"
              onClick={() => setShowModal(false)}
              className="flex cursor-pointer self-start md:hidden"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex h-[12rem] items-center justify-center rounded-lg">
              <Image
                src={displayPicture}
                alt="main display picture"
                className="h-full w-full rounded-lg"
              />
            </div>
            <div className="no_scrollbar mt-5 flex gap-5 overflow-x-auto">
              {data.pictures.map((picture: string) => (
                <div className="w-1/3 rounded-lg" key={picture}>
                  <Image
                    src={picture}
                    alt="car pictures"
                    className={`h-full cursor-pointer rounded-lg p-[3px] ${
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
                className="hidden cursor-pointer self-start md:flex"
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
                <span className="text-xs text-gray-400"> day</span>
              </p>
              <button
                className="rounded bg-blue500 px-6 py-2 font-medium text-white"
                onClick={() => setShowModalScreen2(true)}
              >
                Rent Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="fixed inset-0 z-10 h-screen w-screen bg-black opacity-30 dark:bg-white dark:opacity-10"
        onClick={() => setShowModal(false)}
      ></div>
    </>
  );
};

export default CarDetailsModalOne;

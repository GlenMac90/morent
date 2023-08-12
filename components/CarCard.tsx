"use client";

import Image from "next/image";
import React, { useState } from "react";
import CarDetailsModalOne from "./CarDetailsModalOne";

import {
  heart,
  litres,
  peopleCapacity,
  redHeart,
  transmission,
} from "../public/svg-icons/index";

import {
  carTestPicture,
  carInteriorOne,
  carInteriorTwo,
  carExterior,
} from "@/public/testCarPictures";

const dummyData = {
  brand: "Rolls-Royce",
  type: "Sedan",
  capacity: 4,
  transmission: "Manual",
  fuelCapacity: 80,
  isFavourited: true,
  shortDescription:
    "The Rolls-Royce is a British luxury automobile maker known for its opulent design, unmatched craftsmanship, and attention to detail.",
  rentPrice: "96.00",
  mainPicture: carTestPicture,
  pictures: [carExterior, carInteriorOne, carInteriorTwo],
};

const CarCard = ({ isPopularCar = false }) => {
  const [isFavourited, setIsFavourited] = useState(dummyData.isFavourited);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className={`flex w-full flex-col rounded-lg
        bg-white p-4 shadow hover:translate-y-[-1px] hover:shadow-lg xs:max-w-[28rem] sm:w-auto sm:max-w-full ${
          isPopularCar && "min-w-[16rem]"
        }`}
      >
        <div className="flex w-full justify-between">
          <div className="flex flex-col">
            <p className="font-medium xs:text-xl">{dummyData.brand}</p>
            <p className="mt-1 text-xs font-semibold text-gray400 xs:text-sm">
              {dummyData.type}
            </p>
          </div>
          <Image
            src={isFavourited ? redHeart : heart}
            alt="heart button"
            className="h-4 w-4 cursor-pointer self-start xs:h-6 xs:w-6"
            onClick={() => setIsFavourited((prev) => !prev)}
          />
        </div>
        <div
          className={`mt-3 flex justify-between ${
            isPopularCar ? "flex-col" : "sm:flex-col"
          }`}
        >
          <Image
            src={dummyData.mainPicture}
            alt="car picture"
            className={`mb-1 ml-4 h-[3rem] w-[10rem] self-end xs:mt-6 xs:h-[5rem] xs:w-[16.25rem] sm:ml-0 sm:h-[4.5rem] sm:w-[14.75rem] sm:self-center ${
              isPopularCar ? "self-center" : "self-end sm:self-center"
            }`}
          />
          <div
            className={`flex gap-3 xs:mt-4 sm:mt-6 ${
              isPopularCar
                ? "mt-3 flex-row justify-between"
                : "flex-col sm:flex-row"
            } sm:justify-evenly`}
          >
            <div className="flex">
              <Image
                src={litres}
                alt="engine literage"
                className="h-3.5 w-3.5 xs:h-5 xs:w-5"
              />
              <p className="ml-1 self-center text-xs text-gray400 xs:ml-1.5 xs:text-sm">
                {dummyData.fuelCapacity}L
              </p>
            </div>
            <div className="flex">
              <Image
                src={transmission}
                alt="transmission"
                className="h-3.5 w-3.5 xs:h-5 xs:w-5"
              />
              <p className="ml-1 self-center text-xs text-gray400 xs:text-sm sm:ml-1.5">
                {dummyData.transmission}
              </p>
            </div>
            <div className="flex">
              <Image
                src={peopleCapacity}
                alt="people capacity"
                className="h-3.5 w-3.5 xs:h-5 xs:w-5"
              />
              <p className="ml-1 self-center text-xs text-gray400 xs:text-sm sm:ml-1.5">
                {dummyData.capacity}{" "}
                {dummyData.capacity === 1 ? "person" : "people"}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex w-full justify-between">
          <p className="self-center font-medium">
            ${dummyData.rentPrice}/
            <span className="text-xs text-gray400">day</span>
          </p>
          <button
            className="rounded-md bg-blue500 px-5 py-2 text-sm font-medium text-white"
            onClick={() => setShowModal(true)}
          >
            More Info
          </button>
        </div>
      </div>
      {showModal && (
        <CarDetailsModalOne
          data={dummyData}
          setShowModal={setShowModal}
          isPopular={isPopularCar}
        />
      )}
    </>
  );
};

export default CarCard;

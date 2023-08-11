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
        className={`flex w-full ${
          isPopularCar ? "min-w-[15rem]" : "max-w-sm"
        } flex-col rounded-lg bg-white p-4 shadow hover:translate-y-[-1px] hover:shadow-lg sm:w-auto sm:max-w-full`}
      >
        <div className="flex w-full justify-between">
          <div className="flex flex-col">
            <p className="font-medium sm:text-xl">{dummyData.brand}</p>
            <p className="mt-1 text-xs font-semibold text-gray400 sm:text-sm">
              {dummyData.type}
            </p>
          </div>
          <Image
            src={isFavourited ? redHeart : heart}
            alt="heart button"
            className="h-4 w-4 cursor-pointer self-start sm:h-6 sm:w-6"
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
            className={`mb-1 ml-4 h-[3rem] w-[10rem] self-end sm:ml-0 sm:mt-6 sm:h-[4.5rem] sm:w-[14.75rem] sm:self-center ${
              isPopularCar ? "self-center" : "self-end sm:self-center"
            }`}
          />
          <div
            className={`flex gap-3 sm:mt-6 ${
              isPopularCar
                ? "mt-3 flex-row justify-between"
                : "flex-col sm:flex-row"
            } sm:justify-evenly`}
          >
            <div className="flex">
              <Image
                src={litres}
                alt="engine literage"
                className="h-3.5 w-3.5 sm:h-5 sm:w-5"
              />
              <p className="ml-1 self-center text-xs text-gray400 sm:ml-1.5 sm:text-sm">
                {dummyData.fuelCapacity}L
              </p>
            </div>
            <div className="flex">
              <Image
                src={transmission}
                alt="transmission"
                className="h-3.5 w-3.5 sm:h-5 sm:w-5"
              />
              <p className="ml-1 self-center text-xs text-gray400 sm:ml-1.5 sm:text-sm">
                {dummyData.transmission}
              </p>
            </div>
            <div className="flex">
              <Image
                src={peopleCapacity}
                alt="people capacity"
                className="h-3.5 w-3.5 sm:h-5 sm:w-5"
              />
              <p className="ml-1 self-center text-xs text-gray400 sm:ml-1.5 sm:text-sm">
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

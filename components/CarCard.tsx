"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

import CarDetailsModalOne from "./CarDetailsModalOne";
import { dummyData } from "@/utils/dummyCarData";

import {
  heart,
  litres,
  peopleCapacity,
  redHeart,
  transmission,
  editSymbol,
} from "../public/svg-icons/index";

interface CarCardProps {
  id: string;
  isPopularCar?: boolean;
  canEdit?: boolean;
}

const CarCard: React.FC<CarCardProps> = ({
  id,
  isPopularCar = false,
  canEdit = false,
}) => {
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
          {!canEdit ? (
            <Image
              src={isFavourited ? redHeart : heart}
              alt="heart button"
              className="h-4 w-4 cursor-pointer self-start xs:h-6 xs:w-6"
              onClick={() => setIsFavourited((prev) => !prev)}
            />
          ) : (
            <Link href={`/car/${dummyData.id}`}>
              <Image
                src={editSymbol}
                alt="edit button"
                className="h-4 w-4 cursor-pointer self-start xs:h-6 xs:w-6"
              />
            </Link>
          )}
        </div>
        <div
          className={`mt-3 flex justify-between ${
            isPopularCar ? "flex-col" : "sm:flex-col"
          }`}
        >
          <Image
            src={dummyData.mainPicture}
            alt="car picture"
            className={`mb-1 ml-4 h-[3rem] w-[10rem] self-end xs:mt-6 xs:h-[4rem] xs:w-[13.25rem] sm:ml-0 sm:h-[5rem] sm:w-[16.25rem] sm:self-center ${
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
            className={`rounded-md bg-blue500 px-5 py-2 text-sm font-medium text-white ${
              canEdit && "hidden"
            }`}
            onClick={() => setShowModal(true)}
          >
            More Info
          </button>
        </div>
      </div>
      {showModal && (
        <div className="absolute flex w-screen max-w-7xl items-center justify-center">
          {/* Type error of data will so away once dummyData is removed and lived data will be a string leading to the URL of the image */}
          <CarDetailsModalOne
            id={id}
            data={dummyData}
            setShowModal={setShowModal}
            isPopular={isPopularCar}
          />
          {/* Type error of data will so away once dummyData is removed and lived data will be a string leading to the URL of the image */}
        </div>
      )}
    </>
  );
};

export default CarCard;

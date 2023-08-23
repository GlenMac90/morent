"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

import CarDetailsModalOne from "./CarDetailsModalOne";
import { CarData } from "@/constants/interfaces";

import {
  heart,
  litres,
  peopleCapacity,
  redHeart,
  transmission,
  editSymbol,
  editSymbolDarkMode,
} from "../../public/svg-icons/index";

interface CarCardProps {
  carData: CarData;
  id: string;
  isPopularCar?: boolean;
  canEdit?: boolean;
  canReview?: boolean;
}

const CarCard: React.FC<CarCardProps> = ({
  carData,
  id,
  isPopularCar = false,
  canEdit = false,
  canReview = false,
}) => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isFavourited, setIsFavourited] = useState(carData.isFavourited);
  const [showModal, setShowModal] = useState(false);
  const [motionKey, setMotionKey] = useState(0);

  const handleButtonClick = () => {
    setIsFavourited((prev) => !prev);
    setMotionKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <motion.div
        animate={{ scale: 1, y: 0 }}
        initial={{ scale: 0, y: 500, opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={`flex w-full flex-col rounded-lg bg-white
        p-4 shadow hover:shadow-xl dark:bg-gray850 ${
          isPopularCar ? "min-w-[18rem]" : "xs:max-w-[28rem]"
        } sm:w-auto sm:max-w-full`}
      >
        <div className="flex w-full justify-between">
          <div className="flex flex-col">
            <p className="font-medium xs:text-xl">{carData.brand}</p>
            <p className="mt-1 text-xs font-semibold text-gray400 xs:text-sm">
              {carData.type}
            </p>
          </div>
          {!canEdit ? (
            <motion.div
              key={motionKey}
              className="flex"
              animate={{ scale: isFavourited ? [1.6, 1] : [1, 1] }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src={isFavourited ? redHeart : heart}
                alt="heart button"
                className={`h-4 w-4 cursor-pointer self-start xs:h-6 xs:w-6 ${
                  isFavourited && "heart_animation"
                }`}
                onClick={handleButtonClick}
              />
            </motion.div>
          ) : (
            <Link href={`/cars/${carData.id}`}>
              <Image
                src={theme === "light" ? editSymbol : editSymbolDarkMode}
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
          <div className="flex w-full justify-center">
            <Image
              src={carData.mainPicture}
              alt="car picture"
              className={`mb-1 ml-0 h-[3.3rem] w-[11rem] self-end dark:bg-gray850 xs:ml-4 xs:mt-6 xs:h-[4rem] xs:w-[13.25rem] sm:ml-0 sm:h-[4.5rem] sm:w-[236px] sm:self-center ${
                isPopularCar ? "self-center" : "self-end sm:self-center"
              }`}
            />
          </div>
          <div
            className={`flex gap-3 xs:mt-4  sm:mt-6  ${
              isPopularCar
                ? "mt-3 flex-row justify-evenly"
                : "w-1/3 flex-col sm:w-auto sm:flex-row"
            } sm:justify-evenly`}
          >
            <div className="flex">
              <Image
                src={litres}
                alt="engine literage"
                className="h-3.5 w-3.5 xs:h-5 xs:w-5"
              />
              <p className="ml-1 self-center text-xs text-gray400 xs:ml-1.5 xs:text-sm">
                {carData.fuelCapacity}L
              </p>
            </div>
            <div className="flex">
              <Image
                src={transmission}
                alt="transmission"
                className="h-3.5 w-3.5 xs:h-5 xs:w-5"
              />
              <p className="ml-1 self-center text-xs text-gray400 xs:text-sm sm:ml-1.5">
                {carData.transmission}
              </p>
            </div>
            <div className="flex">
              <Image
                src={peopleCapacity}
                alt="people capacity"
                className="h-3.5 w-3.5 xs:h-5 xs:w-5"
              />
              <p className="ml-1 self-center text-xs text-gray400 xs:text-sm sm:ml-1.5">
                {carData.capacity}{" "}
                {carData.capacity === 1 ? "person" : "people"}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex w-full justify-between">
          <p className="self-center font-medium">
            ${carData.rentPrice}/
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
      </motion.div>
      {showModal && (
        <div
          className={`absolute flex ${
            pathname === "/search"
              ? "h-screen w-screen lg:left-5 xl:left-0"
              : "w-screen max-w-7xl"
          } w-screen items-center justify-center xs:pr-14 xl:justify-self-center xl:pr-0`}
        >
          {/* Type error of data will so away once dummyData is removed and lived data will be a string leading to the URL of the image */}
          <CarDetailsModalOne
            id={id}
            carData={carData}
            setShowModal={setShowModal}
            isPopular={isPopularCar}
            canReview={canReview}
          />
          {/* Type error of data will so away once dummyData is removed and lived data will be a string leading to the URL of the image */}
        </div>
      )}
    </>
  );
};

export default CarCard;

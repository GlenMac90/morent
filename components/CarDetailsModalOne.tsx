"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import { cross, whiteCross } from "../public/svg-icons/index";
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
  id: string;
  data: CarData;
  setShowModal: (show: boolean) => void;
  isPopular?: boolean; // assuming isPopular might be optional
}

const CarDetailsModalOne: React.FC<CarDetailsModalOneProps> = ({
  id,
  data,
  setShowModal,
  isPopular,
}) => {
  const { theme } = useTheme();
  const [displayPicture, setDisplayPicture] = useState(data.pictures[0]);
  const [showModalScreen2, setShowModalScreen2] = useState(false);
  const [changePicture, setChangePicture] = useState(true);
  const [motionKey, setMotionKey] = useState(0);

  const handleButtonClick = () => {
    setShowModalScreen2(true);
    setMotionKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <motion.div
        key={motionKey}
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        className={`fixed inset-x-2 top-10 z-50 flex flex-col rounded-lg bg-white p-4 dark:bg-gray850 xs:inset-x-auto sm:top-40  md:flex-row 
        ${!showModalScreen2 && "max-w-[25rem] md:max-w-[45rem]"} ${
          !isPopular && "xs:-mr-14 sm:mr-0"
        }`}
      >
        {showModalScreen2 && (
          <CarDetailsModalTwo setShowModal={setShowModal} id={id} />
        )}
        <div
          className={`flex flex-col md:flex-row ${
            showModalScreen2 && "hidden"
          }`}
        >
          <div className="absolute -top-4 right-2 rounded-sm bg-white dark:bg-gray850">
            <Image
              src={theme === "light" ? cross : whiteCross}
              height={20}
              width={20}
              alt="close modal"
              onClick={() => setShowModal(false)}
              className="flex cursor-pointer self-start md:hidden"
            />
          </div>
          <div className="flex flex-col">
            <motion.div
              animate={{ opacity: changePicture ? 100 : 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: changePicture ? 0.08 : 0 }}
              whileHover={{ scale: 1.2 }}
              className="flex h-[12rem] items-center justify-center rounded-lg"
            >
              <Image
                src={displayPicture}
                alt="main display picture"
                className="h-full w-full rounded-lg"
              />
            </motion.div>
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
                    onClick={() => {
                      setChangePicture(false);
                      setDisplayPicture(picture);
                      setTimeout(() => {
                        setChangePicture(true);
                      }, 80); // Adding a short delay to let the component fade out before starting to fade in again
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col px-2 md:ml-10 md:mt-0 md:justify-evenly">
            <div className="flex justify-between">
              <p className="text-xl font-medium">{data.brand}</p>
              <Image
                src={theme === "light" ? cross : whiteCross}
                height={20}
                width={20}
                alt="close modal"
                onClick={() => setShowModal(false)}
                className="hidden cursor-pointer self-start dark:text-white200 md:flex"
              />
            </div>
            <p className="mt-2 text-xs leading-6 text-gray700 dark:text-white200">
              {data.shortDescription}
            </p>
            <div className="mt-4 flex justify-between gap-8">
              <div className="flex w-1/2 justify-between">
                <p className="text-xs text-gray400">Type Car</p>
                <p className="text-xs text-gray700 dark:text-white200">
                  {data.type}
                </p>
              </div>
              <div className="flex w-1/2 justify-between">
                <p className="text-xs text-gray400">Capacity</p>
                <p className="text-xs text-gray700 dark:text-white200">
                  {data.capacity} {data.capacity === 1 ? "person" : "people"}
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-between gap-8">
              <div className="flex w-1/2 justify-between">
                <p className="text-xs text-gray400">Transm.</p>
                <p className="text-xs text-gray700 dark:text-white200">
                  {data.transmission}
                </p>
              </div>
              <div className="flex w-1/2 justify-between">
                <p className="text-xs text-gray400">Gasoline</p>
                <p className="text-xs text-gray700 dark:text-white200">
                  {data.fuelCapacity}L
                </p>
              </div>
            </div>
            <div className="mt-8 flex w-full justify-between">
              <p className="self-center font-medium">
                ${data.rentPrice}/
                <span className="text-xs text-gray-400"> day</span>
              </p>
              <button
                className="rounded bg-blue500 px-6 py-2 font-medium text-white"
                onClick={handleButtonClick}
              >
                Rent Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      <div
        className="fixed inset-0 z-40 h-screen w-screen bg-black opacity-50 dark:bg-gray900 dark:opacity-70"
        onClick={() => setShowModal(false)}
      ></div>
    </>
  );
};

export default CarDetailsModalOne;
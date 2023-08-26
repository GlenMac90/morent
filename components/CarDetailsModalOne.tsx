"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import { cross, whiteCross } from "../public/svg-icons/index";
import CarDetailsModalTwo from "./CarDetailsModalTwo";
import StarRating from "./StarRating";
import ReviewForm from "./ReviewForm";
import { CarData } from "@/constants/interfaces";

interface CarDetailsModalOneProps {
  id: string;
  data: CarData;
  setShowModal: (show: boolean) => void;
  isPopular?: boolean;
  canReview?: boolean;
  carAvailability: boolean;
}

const CarDetailsModalOne: React.FC<CarDetailsModalOneProps> = ({
  id,
  data,
  setShowModal,
  isPopular,
  canReview,
  carAvailability,
}) => {
  const { theme } = useTheme();
  const [displayPicture, setDisplayPicture] = useState(data.pictures[0]);
  const [showModalScreen2, setShowModalScreen2] = useState(false);
  const [changePicture, setChangePicture] = useState(true);
  const [motionKey, setMotionKey] = useState(0);
  const [showReviewScreen, setShowReviewScreen] = useState(false);

  const UnavailableColor = !carAvailability ? "bg-blue100" : "bg-blue500";

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
        className={`fixed inset-x-2 top-[12.75rem] z-50 flex flex-col rounded-lg bg-white p-4 dark:bg-gray850 xs:inset-x-auto  sm:flex-row 
        ${
          !showModalScreen2
            ? "max-w-[30rem] lg:max-w-[65.9rem]"
            : "h-auto max-w-[31.25rem]"
        } ${!isPopular && "xs:-mr-14 sm:mr-0"}`}
      >
        {showModalScreen2 && (
          <CarDetailsModalTwo setShowModal={setShowModal} id={id} />
        )}
        <div
          className={`flex flex-col lg:flex-row ${
            showModalScreen2 && "hidden"
          } ${showReviewScreen && "hidden"}`}
        >
          <div className="absolute -top-4 right-2 rounded-sm bg-white dark:bg-gray850">
            <Image
              src={theme === "light" ? cross : whiteCross}
              height={20}
              width={20}
              alt="close modal"
              onClick={() => setShowModal(false)}
              className="flex cursor-pointer self-start lg:hidden"
            />
          </div>
          <div className="flex flex-col justify-between md:w-full">
            <motion.div
              animate={{ opacity: changePicture ? 100 : 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: changePicture ? 0.08 : 0 }}
              whileHover={{ scale: 1.2 }}
              className="flex h-[15rem] w-full max-w-full items-center justify-center rounded-lg md:max-w-full lg:min-h-[22.5rem]"
            >
              <Image
                src={displayPicture}
                alt="main display picture"
                style={{
                  objectFit: "cover",
                }}
                className="h-full w-full rounded-lg"
              />
            </motion.div>
            <div className="no_scrollbar mt-5 flex gap-5 overflow-x-auto">
              {data.pictures.map((picture: string, index) => (
                <div className="w-1/3 rounded-lg" key={index}>
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

          <div className="mt-8 flex flex-col px-2 md:w-full lg:ml-10 lg:mt-0 lg:justify-between lg:p-6">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <p className="text-xl font-medium lg:text-3xl">{data.brand}</p>
                <Image
                  src={theme === "light" ? cross : whiteCross}
                  height={20}
                  width={20}
                  alt="close modal"
                  onClick={() => setShowModal(false)}
                  className="hidden cursor-pointer self-start dark:text-white200 lg:flex"
                />
              </div>
              <div className={`flex w-full ${canReview && "justify-between"}`}>
                <StarRating
                  rating={data.rating}
                  reviews={data.numberOfReviews}
                />
                <p
                  className={`${
                    !canReview && "hidden"
                  } cursor-pointer self-center`}
                  onClick={() => setShowReviewScreen(true)}
                >
                  Review
                </p>
              </div>
            </div>
            <p className="mt-2 text-xs font-light leading-6 text-gray700 dark:text-white200 lg:text-lg lg:leading-10">
              {data.shortDescription}
            </p>
            <div>
              <div className="mt-4 flex justify-between gap-8">
                <div className="flex w-1/2 justify-between">
                  <p className="text-xs text-gray400 sm:text-lg lg:text-xl">
                    Type Car
                  </p>
                  <p className="text-xs text-gray700 dark:text-white200 sm:text-lg lg:text-xl">
                    {data.type}
                  </p>
                </div>
                <div className="flex w-1/2 justify-between">
                  <p className="text-xs text-gray400 sm:text-lg lg:text-xl">
                    Capacity
                  </p>
                  <p className="text-xs text-gray700 dark:text-white200 sm:text-lg lg:text-xl">
                    {data.capacity} {data.capacity === 1 ? "person" : "people"}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-between gap-8">
                <div className="flex w-1/2 justify-between">
                  <p className="text-xs text-gray400 sm:text-lg lg:text-xl">
                    Transm.
                  </p>
                  <p className="text-xs text-gray700 dark:text-white200 sm:text-lg lg:text-xl">
                    {data.transmission}
                  </p>
                </div>
                <div className="flex w-1/2 justify-between">
                  <p className="text-xs text-gray400 sm:text-lg lg:text-xl">
                    Gasoline
                  </p>
                  <p className="text-xs text-gray700 dark:text-white200 sm:text-lg lg:text-xl">
                    {data.fuelCapacity}L
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex w-full justify-between">
              <p className="self-center font-medium sm:text-2xl">
                ${data.rentPrice}/
                <span className="text-xs text-gray-400 sm:text-base"> day</span>
              </p>
              <button
                className={`${UnavailableColor} rounded  px-6 py-2 font-medium text-white`}
                onClick={handleButtonClick}
                disabled={!carAvailability}
              >
                {!carAvailability
                  ? "Unavailable"
                  : canReview
                  ? "Rent Again"
                  : "Rent Now"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      <div
        className="fixed inset-0 z-40 h-screen w-screen bg-black opacity-50 dark:bg-gray900 dark:opacity-70"
        onClick={() => setShowModal(false)}
      ></div>
      {showReviewScreen && (
        <ReviewForm setShowReviewScreen={setShowReviewScreen} data={data} />
      )}
    </>
  );
};

export default CarDetailsModalOne;

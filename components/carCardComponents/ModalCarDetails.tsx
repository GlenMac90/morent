import React from "react";
import Image from "next/image";

import StarRating from "../reviewComponents/StarRating";
import { cross, whiteCross } from "@/public/svg-icons";
import { CarData } from "@/constants/interfaces";

interface ModalCarDetailsProps {
  carData: CarData;
  theme: string | undefined;
  canReview: boolean | undefined;
  setShowModal: (value: boolean) => void;
  setShowReviewScreen: (value: boolean) => void;
  handleButtonClick: () => void;
  carAvailability: boolean;
}

const ModalCarDetails: React.FC<ModalCarDetailsProps> = ({
  carData,
  theme,
  canReview,
  setShowModal,
  setShowReviewScreen,
  handleButtonClick,
  carAvailability,
}) => {
  const availabilityColor = carAvailability ? "bg-blue500" : "bg-blue100";

  return (
    <div className="mt-8 flex flex-col px-2 md:w-full lg:ml-10 lg:mt-0 lg:justify-between lg:p-6">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <p className="text-xl font-medium lg:text-3xl">{carData.brand}</p>
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
            rating={carData.rating}
            reviews={carData.numberOfReviews}
          />
          <button
            className={`${
              !canReview && "hidden"
            } cursor-pointer self-center rounded border border-gray300 bg-white200 px-3 py-2 font-light hover:bg-blue500 hover:text-white dark:bg-white/50`}
            onClick={() => setShowReviewScreen(true)}
          >
            Review
          </button>
        </div>
      </div>
      <p className="mt-2 text-xs font-light leading-6 text-gray700 dark:text-white200 lg:text-lg lg:leading-10">
        {carData.shortDescription}
      </p>
      <div>
        <div className="mt-4 flex justify-between gap-8">
          <div className="flex w-1/2 justify-between">
            <p className="text-xs text-gray400 sm:text-lg lg:text-xl">
              Type Car
            </p>
            <p className="text-xs text-gray700 dark:text-white200 sm:text-lg lg:text-xl">
              {carData.type}
            </p>
          </div>
          <div className="flex w-1/2 justify-between">
            <p className="text-xs text-gray400 sm:text-lg lg:text-xl">
              Capacity
            </p>
            <p className="text-xs text-gray700 dark:text-white200 sm:text-lg lg:text-xl">
              {carData.capacity} {carData.capacity === 1 ? "person" : "people"}
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-between gap-8">
          <div className="flex w-1/2 justify-between">
            <p className="text-xs text-gray400 sm:text-lg lg:text-xl">
              Transm.
            </p>
            <p className="text-xs text-gray700 dark:text-white200 sm:text-lg lg:text-xl">
              {carData.transmission}
            </p>
          </div>
          <div className="flex w-1/2 justify-between">
            <p className="text-xs text-gray400 sm:text-lg lg:text-xl">
              Gasoline
            </p>
            <p className="text-xs text-gray700 dark:text-white200 sm:text-lg lg:text-xl">
              {carData.fuelCapacity}L
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 flex w-full justify-between">
        <p className="self-center font-medium sm:text-2xl">
          ${carData.rentPrice}/
          <span className="text-xs text-gray-400 sm:text-base"> day</span>
        </p>
        <button
          className={`${availabilityColor} rounded px-6 py-2 font-medium text-white`}
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
  );
};

export default ModalCarDetails;

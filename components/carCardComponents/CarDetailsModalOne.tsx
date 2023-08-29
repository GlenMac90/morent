"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

import { cross, whiteCross } from "../../public/svg-icons/index";
import CarDetailsModalTwo from "./CarDetailsModalTwo";
import ReviewForm from "../reviewComponents/ReviewForm";
import { CarData } from "@/constants/interfaces";
import ModalImageGallery from "./ModalImageGallery";
import ModalCarDetails from "./ModalCarDetails";

interface CarDetailsModalOneProps {
  id: string;
  carData: CarData;
  setShowModal: (show: boolean) => void;
  isPopular?: boolean;
  canReview?: boolean;
  carAvailability: boolean;
}

const CarDetailsModalOne: React.FC<CarDetailsModalOneProps> = ({
  id,
  carData,
  setShowModal,
  isPopular,
  canReview,
  carAvailability,
}) => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [displayPicture, setDisplayPicture] = useState(carData.pictures[0]);
  const [showModalScreen2, setShowModalScreen2] = useState(false);
  const [changePicture, setChangePicture] = useState(true);
  const [motionKey, setMotionKey] = useState(0);
  const [showReviewScreen, setShowReviewScreen] = useState(false);

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
        } ${!isPopular && "xs:-mr-14 sm:mr-0"}
        ${pathname === "/search" && "xs:ml-3 xs:mr-1 sm:mr-4 lg:ml-6"}`}
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
          <ModalImageGallery
            changePicture={changePicture}
            carData={carData}
            displayPicture={displayPicture}
            setChangePicture={setChangePicture}
            setDisplayPicture={setDisplayPicture}
          />
          <ModalCarDetails
            carData={carData}
            theme={theme}
            canReview={canReview}
            setShowModal={setShowModal}
            setShowReviewScreen={setShowReviewScreen}
            handleButtonClick={handleButtonClick}
            carAvailability={carAvailability}
          />
        </div>
      </motion.div>
      <div
        className="fixed inset-0 z-40 h-full w-full bg-black opacity-50 dark:bg-gray900 dark:opacity-70"
        onClick={() => setShowModal(false)}
      ></div>
      {showReviewScreen && (
        <ReviewForm setShowReviewScreen={setShowReviewScreen} data={carData} />
      )}
    </>
  );
};

export default CarDetailsModalOne;

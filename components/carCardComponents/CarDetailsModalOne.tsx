"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

import { cross, whiteCross } from "../../public/svg-icons/index";
import CarDetailsModalTwo from "./CarDetailsModalTwo";
import ReviewForm from "../reviewComponents/ReviewForm";
import ModalImageGallery from "./ModalImageGallery";
import ModalCarDetails from "./ModalCarDetails";
import { CarParams } from "@/lib/interfaces";

interface CarDetailsModalOneProps {
  id: string;
  carData: CarParams;
  setShowModal: (show: boolean) => void;
  isPopular?: boolean;
  canReview?: boolean;
}

const CarDetailsModalOne: React.FC<CarDetailsModalOneProps> = ({
  id,
  carData,
  setShowModal,
  isPopular,
  canReview,
}) => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [displayPicture, setDisplayPicture] = useState(carData.carImageMain);
  const [showModalScreen2, setShowModalScreen2] = useState(false);
  const [changePicture, setChangePicture] = useState(true);
  const [motionKey, setMotionKey] = useState(0);
  const [showReviewScreen, setShowReviewScreen] = useState(false);
  const [closeModal, setCloseModal] = useState(false);

  const handleShowModalTwo = () => {
    setShowModalScreen2(true);
    setMotionKey((prevKey) => prevKey + 1);
  };

  const handleCloseClick = () => {
    setCloseModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 250);
  };

  return (
    <>
      <motion.div
        key={motionKey}
        animate={{ scale: closeModal ? 0 : 1 }}
        initial={{ scale: 0 }}
        className={`fixed inset-x-2 top-[12.75rem] z-50 flex flex-col rounded-lg bg-white p-4 dark:bg-gray850 xs:inset-x-auto  sm:flex-row 
        ${
          !showModalScreen2
            ? "max-w-[30rem] lg:max-w-[65.9rem]"
            : "h-auto max-w-[31.25rem]"
        } ${!isPopular && "xs:-mr-14 sm:mr-0"}
        ${pathname === "/search" && "xs:ml-3 xs:mr-1 sm:mr-4 lg:ml-6"}
        ${
          showReviewScreen &&
          "bg-black opacity-50 dark:bg-gray900 dark:opacity-70"
        }`}
      >
        {showModalScreen2 && (
          <CarDetailsModalTwo setShowModal={handleCloseClick} id={id} />
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
              onClick={handleCloseClick}
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
            setShowModal={handleCloseClick}
            setShowReviewScreen={setShowReviewScreen}
            handleButtonClick={handleShowModalTwo}
          />
        </div>
      </motion.div>
      <div
        className="fixed inset-0 z-40 h-full w-full bg-black opacity-50 dark:bg-gray900 dark:opacity-70"
        onClick={handleCloseClick}
      ></div>
      {showReviewScreen && (
        <ReviewForm setShowReviewScreen={setShowReviewScreen} data={carData} />
      )}
    </>
  );
};

export default CarDetailsModalOne;

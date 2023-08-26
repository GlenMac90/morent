import React, { useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { motion } from "framer-motion";

import { dummyReviewList } from "@/utils/dummyReviewList";
import { dummyData } from "@/utils/dummyCarData";
import Review from "./Review";

import { whiteCross, cross } from "@/public/svg-icons";

interface ReviewListProps {
  id: number;
  setShowReviews: (show: boolean) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({ id, setShowReviews }) => {
  const [animateClose, setAnimateClose] = useState(false);
  const { theme } = useTheme();

  const handleBackgroundClick = () => {
    setAnimateClose(true);
    setTimeout(() => {
      setShowReviews(false);
    }, 250);
  };

  const handleChildClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-40 flex justify-center bg-black/50"
      onClick={handleBackgroundClick}
    >
      <motion.div
        animate={{ scale: animateClose ? 0 : 1 }}
        initial={{ scale: 0 }}
        onClick={handleChildClick}
        className="fixed top-44 z-50 mx-5 flex max-h-[35rem] w-full max-w-[30rem] flex-col overflow-y-auto rounded-xl bg-white200 p-4 dark:bg-gray900 md:p-5 "
      >
        <div className="flex w-full justify-between">
          <p className="mb-5 self-start text-3xl font-semibold text-gray900 dark:text-white200">
            List of reviews
          </p>
          <Image
            src={theme === "light" ? cross : whiteCross}
            height={30}
            width={30}
            alt="close modal"
            onClick={handleBackgroundClick}
            className="cursor-pointer self-start"
          />
        </div>
        <div className="flex w-full flex-col gap-5">
          {dummyReviewList.map((review, index) => (
            <Review
              key={review.id}
              reviewData={dummyReviewList[index]}
              carData={dummyData}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewList;

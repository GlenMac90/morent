import React from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

import { dummyReviewList } from "@/utils/dummyReviewList";
import Review from "./Review";

import { whiteCross, cross } from "@/public/svg-icons";

interface ReviewListProps {
  id: number;
  setShowReviews: (show: boolean) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({ id, setShowReviews }) => {
  const { theme } = useTheme();

  const handleBackgroundClick = () => {
    setShowReviews(false);
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
      <div
        onClick={handleChildClick}
        className="fixed top-40 z-50 mx-5 flex max-h-[40rem] w-full max-w-3xl flex-col overflow-y-auto rounded-xl bg-white200 p-4 dark:bg-gray900 md:p-6 "
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
            className="self-start"
          />
        </div>
        <div className="flex w-full flex-col gap-5">
          {dummyReviewList.map((review) => (
            <Review key={review.id} data={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;

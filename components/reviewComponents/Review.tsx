"use client";

import React, { useState } from "react";
import Image from "next/image";

import UserReviewStarRating from "./UserReviewStarRating";
import ReviewForm from "./ReviewForm";
import { ReviewData } from "@/lib/interfaces";
import { profilePic } from "@/public/svg-icons";

interface ReviewProps {
  reviewData: ReviewData;
}

const Review: React.FC<ReviewProps> = ({ reviewData }) => {
  console.log(reviewData);
  const [showEditReview, setShowEditReview] = useState(false);
  return (
    <>
      <div className="flex w-full flex-col items-center gap-3 rounded-xl bg-white p-4 dark:bg-gray850 xs:items-start">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <Image
              src={reviewData?.userId?.image || profilePic}
              height={50}
              width={50}
              alt="reviewer picture"
              className="mr-2 h-10 w-10 rounded-full"
            />
            <p className="font-semibold">
              {reviewData?.userId?.username || "user"}
            </p>
          </div>
          <p className="font-semibold">
            {reviewData?.createdAt?.getDate()}/
            {reviewData?.createdAt?.getMonth()}/
            {reviewData?.createdAt?.getFullYear()}
          </p>
        </div>
        <div className="flex w-full justify-between">
          <p className="text-2xl text-gray900 dark:text-white200">
            {reviewData.title}
          </p>
          <p className="text-lg text-gray900 dark:text-white200">
            {reviewData.date}
          </p>
        </div>
        <button
          className="hidden rounded border border-gray300 bg-white200 px-3 py-2 font-light hover:bg-blue500 hover:text-white dark:bg-white/50"
          onClick={() => setShowEditReview(true)}
        >
          Edit Review
        </button>
        <Image
          src={reviewData?.imageUrl}
          alt="review-car-image"
          height={400}
          width={400}
          className="mb-2 h-full  rounded-lg"
        />
        <UserReviewStarRating rating={reviewData.rating} />
        <p className="text-lg font-light leading-8">{reviewData.content}</p>
      </div>
      {showEditReview && (
        <ReviewForm data={carData} setShowReviewScreen={setShowEditReview} />
      )}
    </>
  );
};

export default Review;

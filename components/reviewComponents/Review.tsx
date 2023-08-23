"use client";

import React, { useState } from "react";
import Image from "next/image";

import UserReviewStarRating from "./UserReviewStarRating";
import ReviewForm from "./ReviewForm";
import { CarData } from "@/constants/interfaces";

interface ReviewData {
  id: string;
  ownerId: string;
  title: string;
  imageUrl: string;
  rating: number;
  review: string;
  numberOfReviews: number;
  date: string;
}

interface ReviewProps {
  reviewData: ReviewData;
  carData: CarData;
}

const Review: React.FC<ReviewProps> = ({ reviewData, carData }) => {
  const [showEditReview, setShowEditReview] = useState(false);
  return (
    <>
      <div className="flex w-full flex-col items-center gap-3 rounded-xl bg-white p-4 dark:bg-gray850 xs:items-start">
        <div className="flex w-full justify-between">
          <p className="text-2xl text-gray900 dark:text-white200">
            {reviewData.title}
          </p>
          <p className="text-lg text-gray900 dark:text-white200">
            {reviewData.date}
          </p>
        </div>
        <button
          className="rounded border border-gray300 bg-white200 px-3 py-2 font-light hover:bg-blue500 hover:text-white dark:bg-white/50"
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
        <p className="text-lg font-light leading-8">{reviewData.review}</p>
      </div>
      {showEditReview && (
        <ReviewForm data={carData} setShowReviewScreen={setShowEditReview} />
      )}
    </>
  );
};

export default Review;

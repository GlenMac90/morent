import React from "react";
import Image from "next/image";

import UserReviewStarRating from "./UserReviewStarRating";

interface ReviewData {
  id: number;
  ownerId: number;
  title: string;
  imageUrl: string;
  rating: number;
  review: string;
  numberOfReviews: number;
  date: string;
}

interface ReviewProps {
  data: ReviewData;
}

const Review: React.FC<ReviewProps> = ({ data }) => {
  return (
    <>
      <div className="flex w-full flex-col items-center gap-3  rounded-xl bg-white p-4 dark:bg-gray850 xs:items-start">
        <div className="flex w-full justify-between">
          <p className="text-2xl text-gray900 dark:text-white200">
            {data.title}
          </p>
          <p className="text-lg text-gray900 dark:text-white200">{data.date}</p>
        </div>
        <button className="rounded bg-slate-300/50 px-3 py-2">
          Edit Review
        </button>
        <Image
          src={data?.imageUrl}
          alt="review-car-image"
          height={300}
          width={300}
          className="mb-2 rounded-lg"
        />
        <UserReviewStarRating rating={data.rating} />
        <p className="text-lg font-light leading-8">{data.review}</p>
      </div>
    </>
  );
};

export default Review;

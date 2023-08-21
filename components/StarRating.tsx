import React from "react";
import Image from "next/image";

import { goldStar, emptyStar } from "../public/svg-icons/index";

interface StarRatingProps {
  rating: number;
  reviews: number;
}

const numberOfGoldenStars = (number: number): number => {
  return Math.floor(number);
};

function roundDownToNearestTen(number: number): number {
  if (number < 10) {
    return number;
  } else {
    return Math.floor(number / 10) * 10;
  }
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, reviews }) => {
  const goldenStars = numberOfGoldenStars(rating);
  const blankStars = 4 - goldenStars;
  const reviewCount = roundDownToNearestTen(reviews);
  const goldPartialStarPercentage = rating % 1;
  const blankPartialStarPercentage = 1 - goldPartialStarPercentage;

  const partialGoldenStarBoxWidth =
    "w-[" + Math.round(20 * goldPartialStarPercentage) + "px]";

  const partialBlankStarBoxWidth =
    "w-[" + Math.round(20 * blankPartialStarPercentage) + "px]";
  return (
    <div className="mt-2.5 flex">
      {Array.from({ length: goldenStars }).map((star, index) => (
        <Image key={index} src={goldStar} alt="golden-star" />
      ))}
      <div className={`flex ${partialGoldenStarBoxWidth} overflow-hidden`}>
        <Image
          src={goldStar}
          alt="golden-partial-star"
          height={20}
          width={20}
          objectFit="cover"
          className="min-w-[20px]"
        />
      </div>
      <div
        className={`flex ${partialBlankStarBoxWidth} ${
          goldenStars === 5 && "hidden"
        } justify-end overflow-hidden`}
      >
        <Image
          src={emptyStar}
          alt="blank-partial-star"
          height={20}
          width={20}
          objectFit="cover"
          className="min-w-[20px]"
        />
      </div>
      {Array.from({ length: blankStars }).map((star, index) => (
        <Image key={index} src={emptyStar} alt="blank-star" />
      ))}
      <p className="ml-2">
        {reviewCount}
        {reviews % 10 !== 0 && reviews > 9 && "+"}{" "}
        {reviews === 1 ? "Review" : "Reviews"}
      </p>
    </div>
  );
};

export default StarRating;

import React from "react";
import Image from "next/image";

import { goldStar, emptyStar } from "../../public/svg-icons/index";

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
  const goldenStars = rating !== undefined ? numberOfGoldenStars(rating) : 0;
  const reviewCount =
    reviews !== undefined ? roundDownToNearestTen(reviews) : 0;
  const blankStars = 4 - goldenStars;
  const goldPartialStarPercentage = rating % 1;
  const blankPartialStarPercentage = 1 - goldPartialStarPercentage;

  const partialGoldenStarBoxWidth = {
    width: `${Math.round(20 * goldPartialStarPercentage)}px`,
  };
  const partialBlankStarBoxWidth = {
    width: `${Math.round(20 * blankPartialStarPercentage)}px`,
  };
  return (
    <div className="mt-2.5 flex">
      {Array.from({ length: goldenStars }).map((star, index) => (
        <Image
          key={index}
          src={goldStar}
          alt="golden-star"
          height={20}
          width={20}
        />
      ))}
      <div style={partialGoldenStarBoxWidth} className={`flex overflow-hidden`}>
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
        style={partialBlankStarBoxWidth}
        className={`flex ${
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
        <Image
          key={index}
          src={emptyStar}
          alt="blank-star"
          width={20}
          height={20}
        />
      ))}
      <p className="ml-2 self-center">
        {reviewCount}
        {reviews % 10 !== 0 && reviews > 9 && "+"}{" "}
        {reviews === 1 ? "Review" : "Reviews"}
      </p>
    </div>
  );
};

export default StarRating;

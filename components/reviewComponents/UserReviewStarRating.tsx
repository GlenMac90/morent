import React from "react";
import Image from "next/image";

import { goldStar, emptyStar } from "../../public/svg-icons/index";

interface UserReviewStarRatingProps {
  rating: number;
}

const UserReviewStarRating: React.FC<UserReviewStarRatingProps> = ({
  rating,
}) => {
  const goldenStars = rating;
  const blankStars = 5 - goldenStars;
  return (
    <div className="flex">
      {Array.from({ length: goldenStars }).map((star, index) => (
        <Image key={index} src={goldStar} alt="golden-star" />
      ))}
      {Array.from({ length: blankStars }).map((star, index) => (
        <Image key={index} src={emptyStar} alt="empty-star" />
      ))}
      <p className="ml-2">
        {goldenStars} {goldenStars === 1 ? "star" : "stars"}
      </p>
    </div>
  );
};

export default UserReviewStarRating;

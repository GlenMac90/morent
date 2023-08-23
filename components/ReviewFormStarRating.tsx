import React, { useState } from "react";
import Image from "next/image";

import { goldStar, emptyStar } from "@/public/svg-icons";

interface ReviewFormStarRatingProps {
  setStarRating: (rating: number) => void;
}

const ReviewFormStarRating: React.FC<ReviewFormStarRatingProps> = ({
  setStarRating,
}) => {
  const [hoveredStar, setHoveredStar] = useState(-1);
  const [selectedStar, setSelectedStar] = useState(-1);

  const handleClick = (star: number, index: number) => {
    setSelectedStar(star);
    setStarRating(index + 1);
  };

  return (
    <div className="mt-5 flex">
      {[0, 1, 2, 3, 4].map((star, index) => (
        <div
          key={star}
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(-1)}
          onClick={() => handleClick(star, index)}
          className="self-center" // Update selectedStar on click
        >
          <Image
            src={
              star <= selectedStar // If star is selected
                ? goldStar
                : star <= hoveredStar // If star is hovered and not selected
                ? goldStar
                : emptyStar
            }
            alt="star"
            height={30}
            width={30}
            className="cursor-pointer"
          />
        </div>
      ))}
      <p
        className={`ml-2 self-center text-lg font-semibold ${
          selectedStar === -1 && "hidden"
        }`}
      >
        {selectedStar + 1} {selectedStar + 1 === 1 ? "star" : "stars"}
      </p>
    </div>
  );
};

export default ReviewFormStarRating;

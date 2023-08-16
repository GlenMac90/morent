import React from "react";
import Image from "next/image";

interface AdvertProps {
  title: string;
  description: string;
  imageSrc: string;
  additionalStyles: string;
}

const Advert: React.FC<AdvertProps> = ({
  title,
  description,
  imageSrc,
  additionalStyles,
}) => {
  return (
    <div
      className={`${additionalStyles} flex h-60 w-full flex-col justify-between rounded-xl px-6 pb-3 pt-6 sm:h-[22.5rem]`}
    >
      <div className="flex flex-col">
        <p className="w-full text-white sm:text-3xl lg:w-1/2">{title}</p>
        <p className="mt-4 w-full text-xs text-white sm:text-base lg:w-1/2">
          {description}
        </p>
      </div>
      <Image
        src={imageSrc}
        alt="car picture"
        width={192}
        height={56}
        className="ml-6 h-14 w-48 self-center sm:h-[7.25rem] sm:w-[25.5rem]"
      />
    </div>
  );
};

export default Advert;

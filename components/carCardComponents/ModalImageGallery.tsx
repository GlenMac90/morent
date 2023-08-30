import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CarParams } from "@/lib/interfaces";
import { advertSilverCar } from "@/public/pngs";
import { dummyData } from "@/utils/dummyCarData";

interface ModalImageGalleryProps {
  changePicture: boolean;
  carData: CarParams;
  displayPicture: string | undefined;
  setChangePicture: (value: boolean) => void;
  setDisplayPicture: (value: string) => void;
}

const ModalImageGallery: React.FC<ModalImageGalleryProps> = ({
  changePicture,
  carData,
  displayPicture,
  setChangePicture,
  setDisplayPicture,
}) => {
  console.log(carData);
  let images = carData?.carImages || [];
  let mainImage = images[0] || advertSilverCar;

  if (images.length === 0) {
    images = dummyData.pictures;
    mainImage = dummyData.pictures[0];
  }

  return (
    <div className="flex flex-col justify-between md:w-full">
      <motion.div
        animate={{ opacity: changePicture ? 100 : 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: changePicture ? 0.08 : 0 }}
        whileHover={{ scale: 1.2 }}
        className="flex h-[15rem] w-full max-w-full items-center justify-center rounded-lg md:max-w-full lg:min-h-[22.5rem]"
      >
        <Image
          src={displayPicture || dummyData.pictures[0]}
          alt="main display picture"
          style={{
            objectFit: "cover",
          }}
          className="h-full w-full rounded-lg"
        />
      </motion.div>
      <div className="no_scrollbar mt-5 flex gap-5 overflow-x-auto">
        {images.map((picture: string, index: number) => (
          <div className="w-1/3 rounded-lg" key={index}>
            <Image
              src={picture}
              alt="car pictures"
              className={`h-full cursor-pointer rounded-lg p-[3px] ${
                displayPicture === picture && "border border-blue-600 p-[1px]"
              }`}
              onClick={() => {
                setChangePicture(false);
                setDisplayPicture(picture);
                setTimeout(() => {
                  setChangePicture(true);
                }, 80);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModalImageGallery;

import React from "react";
import { motion } from "framer-motion";

import CarCard from "../carCardComponents/CarCard";
import { dummyData } from "@/utils/dummyCarData";
import { CarParams } from "@/lib/interfaces";

interface PopularCarsProps {
  carData: CarParams;
}

const RecommendedCars: React.FC<PopularCarsProps> = ({ carData }) => {
  return (
    <motion.div
      animate={{ scale: 1 }}
      initial={{ scale: 0 }}
      className="flex w-full flex-col"
    >
      <p className="ml-5 mt-5 self-start font-medium text-gray400 xs:mt-0 xl:mx-10">
        Recommended cars
      </p>
      <div className="mt-5 flex w-full flex-col items-center justify-center gap-5 px-5 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {/* Change id to match id of card once live data is passed */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((card) => (
          <CarCard carData={dummyData} key={card} id={"123"} />
        ))}
        {/* Change id to match id of card once live data is passed */}
      </div>
      <button className="my-10 max-w-[14.25rem] self-center rounded bg-blue500 px-10 py-4 text-sm font-medium text-white">
        Show More Cars
      </button>
    </motion.div>
  );
};

export default RecommendedCars;

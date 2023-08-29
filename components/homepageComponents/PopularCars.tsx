"use client";

import React from "react";
import { motion } from "framer-motion";

import CarCard from "../carCardComponents/CarCard";
import { CarParams } from "@/lib/interfaces";

interface PopularCarsProps {
  popularCars: CarParams[] | null;
}

const PopularCars: React.FC<PopularCarsProps> = ({ popularCars }) => {
  return (
    <motion.div
      animate={{ scale: 1 }}
      initial={{ scale: 0 }}
      className="flex w-full flex-col"
    >
      <div className="mt-11 flex w-full justify-between px-5 xl:px-10">
        <p className="font-medium text-gray400">Popular Cars</p>
        <p className="font-medium text-blue500">View All</p>
      </div>
      <div className="no_scrollbar mt-4 flex w-full gap-5 overflow-x-auto xs:mt-0 xs:items-center xs:p-5 sm:grid sm:grid-cols-2 sm:flex-col sm:justify-center sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        <div className="absolute right-0 h-60 w-20 bg-gradient-to-r from-transparent to-white/100 dark:to-gray900/100 xs:h-72 sm:hidden"></div>
        <div className="flex w-5 xs:hidden" />

        {popularCars?.map((car, index) => (
          <CarCard carData={car} key={car._id} isPopularCar={true} />
        ))}
      </div>
    </motion.div>
  );
};

export default PopularCars;

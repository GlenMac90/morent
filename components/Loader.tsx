"use client";

import React from "react";
import Image from "next/image";
import { loaderCityscape, advertWhiteCar } from "@/public/pngs";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="z-10 flex h-screen w-screen flex-col items-center justify-center bg-white200">
      <div className="flex w-full items-center justify-center">
        <div className="z-20 h-full w-full bg-white200"></div>
        <div className="mt-40 flex flex-col overflow-hidden rounded-t-full bg-white px-80 pt-72">
          <Image
            src={advertWhiteCar}
            alt="car image"
            height={60}
            width={200}
            className="z-20 min-w-[200px] self-center"
          />
          <motion.div
            className="fixed bottom-[2rem] flex items-center self-center"
            animate={{ rotate: -360 }}
            transition={{
              duration: 8,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <Image
              src={loaderCityscape}
              alt="cityscape image"
              height={700}
              width={700}
              className="z-0 min-w-[700px] self-center"
            />
          </motion.div>
        </div>
        <div className="z-20 h-full w-full bg-white200"></div>
      </div>
      <div className="z-20 flex w-full flex-auto justify-center bg-white200">
        <p className="mt-2 text-3xl font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;

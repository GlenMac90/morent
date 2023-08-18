"use client";

import React from "react";
import Image from "next/image";
import { loaderCityscape, advertWhiteCar } from "@/public/pngs";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed z-10 flex h-screen w-screen flex-col items-center justify-center bg-white200">
      <div className="flex w-full items-center justify-center">
        <div className="z-20 h-full w-full bg-white200"></div>
        <div className="sky_animation mt-40 flex flex-col overflow-hidden rounded-t-full px-80 pt-72">
          <div className="sun_moon absolute"></div>
          <div className="star_container absolute -translate-x-24 -translate-y-52">
            {[0, 1, 2, 3, 4].map((star) => (
              <div key={star} className="shooting_star"></div>
            ))}
          </div>
          <div className="absolute z-10 translate-x-[-6.5rem] translate-y-[2rem] md:translate-x-[-5rem] lg:translate-x-[-4.5rem]">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((puff) => (
              <div key={puff} className="smoke_list z-10"></div>
            ))}
          </div>
          <div className="cloud_container absolute -translate-y-40">
            {[0, 1, 2].map((cloud) => (
              <div key={cloud} className="cloud absolute"></div>
            ))}
          </div>
          <Image
            src={advertWhiteCar}
            alt="car image"
            height={75}
            width={250}
            className="car_bounce z-20 min-w-[250px] self-center"
          />
          <motion.div
            className="fixed top-[18.5rem] flex items-center self-center"
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
        <p className="loading_text mt-2 flex text-4xl font-semibold">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;

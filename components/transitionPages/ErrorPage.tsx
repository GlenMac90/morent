"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

import { advertWhiteCar, cityScapeCropped } from "@/public/pngs";

const ErrorPage = ({ errorMessage = "" }) => {
  const { theme } = useTheme();
  return (
    <div className="fixed flex h-screen w-screen flex-col items-center justify-center bg-white200 p-2 dark:bg-gray900">
      <p className="mt-28 text-3xl font-semibold">
        Uh oh something went wrong...
      </p>
      <div className="flex flex-col items-center justify-center gap-8 rounded-xl p-8">
        <div
          className={`flex justify-center rounded-t-full ${
            theme === "light" ? "bg-blue200" : "bg-gray200"
          } px-24`}
        >
          <Image
            src={cityScapeCropped}
            alt="cityscape"
            width={500}
            height={500}
            className="min-w-[500px]"
          />
          <Image
            src={advertWhiteCar}
            alt="car image for 404 page"
            width={250}
            height={75}
            className="absolute z-20 min-w-[250px] translate-y-2 self-end"
          />
          <ul className="absolute z-10 -translate-y-10 translate-x-20 self-end">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((listItem) => (
              <li className="smoke_list z-10" key={listItem}></li>
            ))}
          </ul>
          <div
            className={`absolute h-20 w-20 translate-x-14 translate-y-10 rounded-full ${
              theme === "light" ? "bg-yellow200" : "bg-white"
            } blur-[2px]`}
          ></div>
          <div
            className={`absolute -translate-x-20 translate-y-24 ${
              theme === "dark" && "hidden"
            }`}
          >
            {[0, 1, 2].map((cloud) => (
              <div key={cloud} className="cloud absolute"></div>
            ))}
          </div>
          <div
            className={`absolute -translate-x-20 translate-y-20 opacity-50 ${
              theme === "light" && "hidden"
            }`}
          >
            {[0, 1, 2, 3, 4].map((star) => (
              <div key={star} className="shooting_star"></div>
            ))}
          </div>
        </div>
        <p className="text-xl font-semibold">{errorMessage}</p>

        <Link href="/">
          <button className="rounded-lg bg-blue500 px-5 py-3 text-xl font-medium text-white">
            Let&apos;s go home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;

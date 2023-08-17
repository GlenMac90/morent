import React from "react";
import Image from "next/image";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white200 p-2">
      <div className="flex flex-col items-center justify-center gap-12 rounded-xl bg-white p-8">
        <p className="text-3xl font-semibold">Uh oh something went wrong...</p>
        <div className="flex">
          <Image
            src="/pngs/advertWhiteCar.png"
            alt="car image for 404 page"
            width={400}
            height={120}
            className="relative z-20 rotate-[-5deg]"
          />
          <ul className="z-10 -translate-x-16 translate-y-10">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((listItem) => (
              <li className="smoke_list z-10" key={listItem}></li>
            ))}
          </ul>
        </div>
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

"use client";

import Link from "next/link";
import React, { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import ReviewList from "./reviewComponents/ReviewList";
import { profileDefaultCover } from "@/public/pngs";

type ProfileHeadingProps = {
  userData: string;
  reviews: string;
};

const ProfileHeading: React.FC<ProfileHeadingProps> = ({
  userData,
  reviews,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const parsedReviews = JSON.parse(reviews);
  const parsedUserData = JSON.parse(userData);

  const handleEditCover = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  };

  function handleSelectNewBanner(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { files: newFile } = e.target;
    if (newFile) {
      console.log(newFile);
    }
  }

  const [showReviews, setShowReviews] = useState(false);
  return (
    <motion.div animate={{ scale: 1 }} initial={{ scale: 0 }}>
      <div className="flex justify-between">
        <p className="text-xl font-semibold text-gray900 dark:text-white200">
          My Profile
        </p>
        <p
          onClick={() => setShowReviews((prev) => !prev)}
          className="cursor-pointer text-xl font-semibold text-gray900 dark:text-white200"
        >
          Show Reviews
        </p>
        {showReviews && (
          <ReviewList
            reviews={parsedReviews}
            setShowReviews={setShowReviews}
            canEdit={true}
          />
        )}
      </div>
      <section className="mt-6 flex h-auto w-full flex-col rounded-xl bg-white dark:bg-gray850">
        <div className="relative flex h-40 md:h-48">
          <Image
            src={parsedUserData?.coverImage || profileDefaultCover}
            alt="cover-picture"
            layout="fill"
            style={{
              objectFit: "cover",
              objectPosition: "center 80%",
            }}
            className="rounded-t-xl"
          />
          <button
            onClick={handleEditCover}
            className="absolute bottom-2.5 right-2.5 rounded bg-white/40 px-2.5 py-1.5 text-[10px] text-white md:bottom-6 md:right-14 md:rounded-md md:px-5 md:py-3 md:text-sm"
          >
            Edit Cover
          </button>
          <input
            placeholder="fileInput"
            className="hidden"
            ref={inputRef}
            type="file"
            multiple={false}
            onChange={handleSelectNewBanner}
            accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
          />
        </div>
        <div className="ml-3.5 flex flex-col justify-between md:ml-8 md:flex-row">
          <div className="flex flex-col md:flex-row">
            {parsedUserData?.image && (
              <Image
                src={parsedUserData?.image}
                alt="profile pic"
                height={70}
                width={70}
                className="absolute translate-y-[-35px] rounded-full md:h-[10rem] md:w-[10rem] md:translate-y-[-63px]"
              />
            )}
            <div className="mt-10 flex flex-col md:mb-8 md:ml-48 md:mt-4">
              <p className="mt-2.5 text-xl font-semibold">
                {parsedUserData?.name}
              </p>
              <p className="mt-2 w-3/5 text-sm text-gray400 sm:w-full">
                {parsedUserData?.bio}
              </p>
            </div>
          </div>
          <Link href="/profile/edit" className="flex">
            <button className="mb-5 mr-2.5 mt-3 self-end rounded-lg bg-blue500 px-6 py-3 text-xs font-semibold text-white md:mb-8 md:mr-12 md:mt-0 md:text-sm">
              Edit Profile
            </button>
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default ProfileHeading;

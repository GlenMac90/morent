"use client";

import React, { useState, useEffect } from "react";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

import {
  darkModeIcon,
  lightModeIcon,
  burgerMenu,
  cross,
  whiteCross,
  lightModeHome,
  lightModeSearch,
  lightModePlus,
  darkModeSearch,
  darkModePlus,
  darkModeHome,
} from "@/public/svg-icons";

const NavBar = () => {
  const { user } = useUser();
  const userImage = user?.profileImageUrl;
  const { userId } = useAuth();
  const [showNavMenu, setShowNavMenu] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const pathname = usePathname();

  let profilePic = darkModeIcon;

  if (userImage) {
    profilePic = userImage;
  }
  const buttons = [
    { title: "Home", path: "/", images: [lightModeHome, darkModeHome] },
    {
      title: "Search",
      path: "/search",
      images: [lightModeSearch, darkModeSearch],
    },
    {
      title: "Add Car",
      path: "/cars/new",
      images: [lightModePlus, darkModePlus],
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowNavMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="fixed z-40 flex h-[5.75rem] w-screen items-center justify-between border-b bg-white px-6 dark:border-b-gray850 dark:bg-gray900 md:h-[6.25rem] md:px-14">
        <Link
          href="/"
          className="text-2xl font-semibold text-blue500 md:text-3xl"
        >
          MORENT
        </Link>
        <div className="flex items-center">
          {buttons.map((button) => (
            <Link key={button.path} href={button.path}>
              <p
                className={`${
                  pathname === button.path
                    ? "text-blue-500"
                    : "text-gray700 dark:text-white200"
                } mr-7 hidden font-medium  md:flex`}
              >
                {button.title}
              </p>
            </Link>
          ))}

          {userId ? (
            <div className="hidden md:flex">
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <Link href="/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F">
              <button className="hidden h-[2.75rem] w-[6.8rem] items-center justify-center rounded bg-blue500 font-semibold text-white md:flex">
                Login
              </button>
            </Link>
          )}

          <span className="mx-1 hidden w-[2.25rem] rotate-90 border-t border-blue-50 dark:border-gray850 md:flex"></span>
          <Image
            src={theme === "light" ? lightModeIcon : darkModeIcon}
            height={20}
            width={20}
            alt="light mode icon"
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className="cursor-pointer"
          />
          <Link href="/profile/id" className="mx-3 md:hidden">
            <UserButton afterSignOutUrl="/" />
          </Link>
          <Image
            src={burgerMenu}
            height={24}
            width={24}
            alt="menu click"
            className="md:hidden"
            onClick={() => setShowNavMenu(!showNavMenu)}
          />
        </div>
      </nav>
      {showNavMenu && (
        <>
          <div
            className="fixed z-40 flex h-screen w-screen justify-center bg-black opacity-50 dark:bg-gray900 dark:opacity-70 md:hidden"
            onClick={() => setShowNavMenu(false)}
          />
          <motion.div
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
            className="fixed inset-x-3 top-6 z-50 flex flex-col rounded-xl bg-white100 p-6 opacity-100 dark:bg-gray850 md:hidden"
          >
            <div className="flex justify-between">
              <p className="font-plusJakartaSans text-xl font-semibold text-blue500 md:text-3xl">
                MORENT
              </p>
              <Image
                src={theme === "light" ? cross : whiteCross}
                height={20}
                width={20}
                alt="close modal"
                onClick={() => setShowNavMenu(false)}
                className="cursor-pointer dark:text-white200"
              />
            </div>
            <div className="mt-12 flex flex-col gap-2">
              {buttons.map((navButton) => (
                <Link
                  onClick={() => setShowNavMenu(false)}
                  key={navButton.path}
                  href={navButton.path}
                  className={`flex rounded p-3 ${
                    pathname === navButton.path
                      ? "bg-blue500 text-white"
                      : "text-gray700 dark:text-white200"
                  }`}
                >
                  <Image
                    src={
                      navButton.path === pathname || theme !== "light"
                        ? navButton.images[1]
                        : navButton.images[0]
                    }
                    width={16}
                    height={16}
                    alt={`${navButton.title} icon`}
                  />
                  <p className="ml-1.5 text-sm">{navButton.title}</p>
                </Link>
              ))}
              <button className="mt-5 flex w-full items-center justify-center rounded border-blue50 bg-white py-3.5 text-sm font-semibold text-blue500 dark:bg-gray700 dark:text-blue300">
                <Image
                  src={profilePic}
                  height={20}
                  width={20}
                  alt="profile pic"
                  className={`${
                    userId ? "mr-1.5 flex min-h-[20px] rounded-full" : "hidden"
                  }`}
                />
                <Link
                  href={
                    userId
                      ? "/profile/id"
                      : "/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F"
                  }
                >
                  <p>{userId ? "My Profile" : "Login"}</p>
                </Link>
              </button>
              <button
                className={`${
                  userId ? "flex" : "hidden"
                } w-full items-center justify-center rounded bg-red400 py-3.5 text-sm font-semibold text-white`}
              >
                Logout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default NavBar;

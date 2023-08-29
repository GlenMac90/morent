import { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

import { navButtons } from '@/constants';
import {
  cross,
  whiteCross,
  darkModeHome,
  darkModeIcon,
} from '@/public/svg-icons';
import { clearLocalStorageItems } from '@/utils/utility.clientFunctions';

interface MobileNavBarProps {
  theme: string | undefined;
  setShowNavMenu: (show: boolean) => void;
  pathname: string;
  userId?: string | null | undefined;
  userImage?: string;
}

const MobileNavBar: FC<MobileNavBarProps> = ({
  theme,
  setShowNavMenu,
  pathname,
  userId,
  userImage,
}) => {
  let profilePic = darkModeIcon;
  if (userImage) {
    profilePic = userImage;
  }

  return (
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
          src={theme === 'light' ? cross : whiteCross}
          height={20}
          width={20}
          alt="close modal"
          onClick={() => setShowNavMenu(false)}
          className="cursor-pointer dark:text-white200"
        />
      </div>
      <div className="mt-12 flex flex-col gap-2">
        {navButtons.slice(0, 3).map((navButton) => (
          <Link
            onClick={() => {
              setShowNavMenu(false);
              clearLocalStorageItems();
            }}
            key={navButton.path}
            href={navButton.path}
            className={`flex rounded p-3 ${
              pathname === navButton.path
                ? 'bg-blue500 text-white'
                : 'text-gray700 dark:text-white200'
            }`}
          >
            <Image
              src={
                navButton.images
                  ? navButton.path === pathname || theme !== 'light'
                    ? navButton.images[1]
                    : navButton.images[0]
                  : darkModeHome
              }
              width={16}
              height={16}
              alt={`${navButton.title} icon`}
            />
            <p className="ml-1.5 text-sm">{navButton.title}</p>
          </Link>
        ))}
        <Link
          onClick={() => setShowNavMenu(false)}
          href={
            userId
              ? '/profile'
              : '/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F'
          }
          className="mt-5 rounded"
        >
          <button
            className="flex w-full items-center justify-center rounded border-blue50 bg-white py-3.5 text-sm font-semibold text-blue500 dark:bg-gray700 dark:text-blue300"
            onClick={clearLocalStorageItems}
          >
            <Image
              src={profilePic}
              height={20}
              width={20}
              alt="profile pic"
              className={`${
                userId ? 'mr-1.5 flex min-h-[20px] rounded-full' : 'hidden'
              }`}
            />

            <p>{userId ? 'My Profile' : 'Login'}</p>
          </button>
        </Link>
        <button
          className={`${
            userId ? 'flex' : 'hidden'
          } w-full items-center justify-center rounded bg-red400 py-3.5 text-sm font-semibold text-white`}
        >
          Logout
        </button>
      </div>
    </motion.div>
  );
};

export default MobileNavBar;

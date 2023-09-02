'use client';

import { useState, useEffect } from 'react';
import { UserButton, useAuth, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useMediaQuery } from '@uidotdev/usehooks';

import { darkModeIcon, lightModeIcon, burgerMenu } from '@/public/svg-icons';
import { navButtons } from '@/constants';
import MobileNavBar from './MobileNavBar';
import { clearLocalStorageItems } from '@/utils/utility.clientFunctions';

const NavBar = () => {
  const { user } = useUser();
  const userImage = user?.profileImageUrl;
  const { userId } = useAuth();
  const [showNavMenu, setShowNavMenu] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const pathname = usePathname();

  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');

  useEffect(() => {
    if (!isSmallDevice) {
      setShowNavMenu(false);
    }
  }, [isSmallDevice]);

  const handleCloseMobileNav = () => {
    setTimeout(() => {
      setShowNavMenu(!showNavMenu);
    }, 250);
  };

  return (
    <>
      <nav className="fixed z-40 flex h-[5.75rem] w-screen items-center justify-between bg-white px-6 dark:border-b-gray850 dark:bg-gray900 lg:h-[6.25rem] lg:border-b lg:px-[3.75rem]">
        <Link
          href="/"
          className="text-2xl font-semibold text-blue500 md:text-3xl"
          onClick={clearLocalStorageItems}
        >
          MORENT
        </Link>
        <div className="flex items-center">
          {navButtons.map((button) => (
            <Link
              key={button.path}
              href={button.path}
              onClick={clearLocalStorageItems}
            >
              <p
                className={`${
                  pathname === button.path
                    ? 'text-blue-500'
                    : 'text-gray700 dark:text-white200'
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
            src={theme === 'light' ? lightModeIcon : darkModeIcon}
            height={20}
            width={20}
            alt="light mode icon"
            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
            className="cursor-pointer"
          />
          <div className="mx-3 md:hidden">
            <UserButton afterSignOutUrl="/" />
          </div>
          <Image
            src={burgerMenu}
            height={24}
            width={24}
            alt="menu click"
            className="md:hidden"
            onClick={handleCloseMobileNav}
          />
        </div>
      </nav>
      {showNavMenu && (
        <MobileNavBar
          theme={theme}
          setShowNavMenu={handleCloseMobileNav}
          pathname={pathname}
          userId={userId}
          userImage={userImage}
        />
      )}
    </>
  );
};

export default NavBar;

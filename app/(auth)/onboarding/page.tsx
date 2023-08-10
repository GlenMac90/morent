import React from 'react';

import { currentUser } from '@clerk/nextjs';
import AccountProfile from '@/components/AccountProfile';
import { userInfo } from 'os';

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const currentUserData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user.username,
    name: userInfo?.name || user?.firstName || '',
    bio: userInfo?.bio || '',
    image: userInfo?.image || user.imageUrl,
  };

  return (
    <main className="flex flex-col  px-12 py-20">
      <h1 className="text-2xl font-semibold leading-7 text-gray900">
        All on board - let us complete your onboarding !!
      </h1>
      <p className="text-base font-normal leading-7">
        Customize your profile for Morent
      </p>
      <section className="mt-8 bg-blue-50 p-10">
        <AccountProfile user={currentUserData} />
      </section>
    </main>
  );
};

export default Page;

import React from 'react';

import { currentUser } from '@clerk/nextjs';
import AccountProfile from '@/components/forms/AccountProfile';
import { User } from '@clerk/nextjs/server';

type ExtendedUser = User & {
  objectId?: string;
  bio?: string;
};

const Page = async () => {
  const user = (await currentUser()) as ExtendedUser;
  if (!user) return null;

  const currentUserData = {
    id: user?.id || '',
    objectId: user?.objectId || '',
    username: user?.username || '',
    name:
      `${user?.firstName} ${user?.lastName}` ||
      user?.firstName ||
      user?.lastName ||
      '',
    bio: user?.bio || '',
    image: user.imageUrl || '',
    onboarded: true,
  };

  console.log(user);
  console.log(currentUserData);

  return (
    <main className="flex flex-col  px-12 py-20">
      <h1 className="text-2xl font-semibold leading-7 text-gray-900">
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

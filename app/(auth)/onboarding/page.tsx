import React from 'react';

import { currentUser } from '@clerk/nextjs';
import AccountProfile from '@/components/forms/AccountProfile';

const Page = async () => {
  const user = await currentUser();

  if (!user) return null;

  return (
    <main className="flex flex-col  px-12 py-20">
      <h1 className="text-2xl font-semibold leading-7 text-gray900">
        All on board - let us complete your onboarding !!
      </h1>
      <p className="text-base font-normal leading-7">
        Customize your profile for Morent
      </p>
      <section className="mt-8 bg-blue-50 p-10">
        <AccountProfile />
      </section>
    </main>
  );
};

export default Page;

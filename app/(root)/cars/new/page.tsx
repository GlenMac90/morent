import React from 'react';

import { currentUser } from '@clerk/nextjs';
import CarForm from '@/components/forms/CarForm';
import { fetchUser } from '@/lib/actions/user.actions';
const Page = async () => {
  const user = (await currentUser()) as any;
  if (!user) return null;
  const userId = user.id;
  const userMongo = await fetchUser(userId);

  return (
    <div className="my-10 flex w-full items-center justify-center bg-white200">
      <CarForm userId={userMongo._id} />
    </div>
  );
};

export default Page;

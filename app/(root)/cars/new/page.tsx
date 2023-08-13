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
    <>
      <CarForm userId={userMongo._id} />
    </>
  );
};

export default Page;

import React from 'react';

import { currentUser } from '@clerk/nextjs';

const page = async () => {
  const user = await currentUser();

  if (!user) return null;

  return <h1>Onboarding</h1>;
};

export default page;

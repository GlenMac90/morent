import React from 'react';

import { currentUser } from '@clerk/nextjs';

const page = async () => {
  const user = await currentUser();

  console.log(user);

  return <h1>Onboarding</h1>;
};

export default page;

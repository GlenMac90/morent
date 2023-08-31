import React from "react";

import { currentUser } from "@clerk/nextjs";
import AccountProfile from "@/components/forms/AccountProfile";
import { User } from "@clerk/nextjs/server";

type ExtendedUser = User & {
  bio?: string;
  image?: string;
  name?: string;
  username?: string;
  email?: string;
};

const Page = async () => {
  const user = (await currentUser()) as ExtendedUser;
  if (!user) return null;

  const currentUserData = {
    id: user.id,
    username: user.username || "",
    name: user.name || "",
    email: user.email || "",
    bio: user.bio || "",
    image: user.image || user.imageUrl || "",
    onboarded: Boolean,
  };

  const currentUserDataString = JSON.stringify(currentUserData);

  return (
    <main className="flex flex-col justify-center bg-white200 px-12 py-20">
      <div className="flex w-full max-w-5xl flex-col self-center">
        <h1 className="text-2xl font-semibold leading-7 text-gray-900">
          All on board - let us complete your onboarding !!
        </h1>
        <p className="text-base font-normal leading-7">
          Customize your profile for Morent
        </p>
        <section className="mt-8 rounded-xl bg-white p-10 shadow-xl">
          <AccountProfile user={currentUserDataString} />
        </section>
      </div>
    </main>
  );
};

export default Page;

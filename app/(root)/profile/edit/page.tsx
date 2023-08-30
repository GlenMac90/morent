import { currentUser } from '@clerk/nextjs';

import { userFromDB } from '@/lib/actions/user.actions';
import AccountProfile from '@/components/forms/AccountProfile';

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  console.log(user);

  const userInfo = await userFromDB(user.id);

  const userData = {
    clerkId: user.id,
    username: userInfo?.username || user.username,
    name: userInfo?.name || `${user.firstName} ${user.lastName}`.trim(),
    email: userInfo?.email || user.emailAddresses[0]?.emailAddress || '',
    bio: userInfo?.bio || '',
    image: userInfo?.image || '',
    onboarded: userInfo?.onboarded || false,
  };

  console.log(userData);

  return (
    <>
      <div className="flex w-screen flex-col items-center justify-center">
        <div className="flex w-full justify-center px-5">
          <section className="mb-10 mt-32 flex w-full max-w-4xl flex-col rounded-xl bg-white p-6 dark:bg-gray850">
            <h1 className="mb-2 text-3xl">Edit Profile</h1>
            <AccountProfile user={JSON.stringify(userData)} />
          </section>
        </div>
      </div>
    </>
  );
}

export default Page;

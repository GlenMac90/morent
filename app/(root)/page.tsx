import { UserButton, currentUser } from '@clerk/nextjs';
import { fetchUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

const Home = async () => {
  const info = await currentUser();
  if (!info) return null;

  const userInfo = await fetchUser(info.id);

  if (!userInfo?.onboarded) redirect('/onboarding');

  console.log(userInfo);

  return (
    <div className="flex h-screen bg-gray-600 p-10">
      <UserButton afterSignOutUrl="/" />
      <p className="">Hello World!</p>
    </div>
  );
};

export default Home;

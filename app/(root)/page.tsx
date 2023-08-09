import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-600 p-10">
      <UserButton afterSignOutUrl="/" />
      <p className="">Hello World!</p>
    </div>
  );
}

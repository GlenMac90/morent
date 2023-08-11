import { SignIn } from '@clerk/nextjs';

const Page = () => (
  <div className="flex min-h-screen items-center justify-center">
    <SignIn />
  </div>
);

export default Page;

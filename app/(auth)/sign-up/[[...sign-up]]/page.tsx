import { SignUp } from '@clerk/nextjs';

const Page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp afterSignUpUrl="/onboarding" />
    </div>
  );
};

export default Page;

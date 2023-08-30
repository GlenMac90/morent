'use client';

import PaymentResult from '@/components/transitionPages/PaymentResult';

const Page = ({ params }) => {
  const { result } = params;
  return <PaymentResult result={result} />;
};

export default Page;

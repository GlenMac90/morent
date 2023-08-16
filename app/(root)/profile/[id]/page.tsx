import React from 'react';

interface PageProps {
  params: string;
}

const Page: React.FC<PageProps> = ({ params }) => {
  console.log(params);

  return <div>Page</div>;
};

export default Page;

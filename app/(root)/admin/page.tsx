import { seedCars } from '@/utils/seedCars';
import React from 'react';

const Page = () => {
  const handleSeedClick = () => {
    seedCars(30);
  };

  return <button onClick={handleSeedClick}>Seed Cars</button>;
};

export default Page;

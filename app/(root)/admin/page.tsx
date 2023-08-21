import { seedCars } from '@/utils/seedCars';
import { deleteAllCars } from '@/utils/deleteAllCars';
import React from 'react';

const Page = () => {
  const handleSeedClick = () => {
    seedCars(30);
  };

  const handleDeleteAllClick = async () => {
    try {
      await deleteAllCars();
      alert('All cars deleted successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to delete all cars.');
    }
  };

  return (
    <div>
      <button onClick={handleSeedClick}>Seed Cars</button>
      <button onClick={handleDeleteAllClick}>Delete All Cars</button>
    </div>
  );
};

export default Page;

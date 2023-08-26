'use client';

import React, { useState } from 'react';
import { seedCars } from '@/utils/seedCars';
import { seedCarReviews } from '@/utils/seedCarReviews';
import { deleteAllCars } from '@/lib/actions/car.actions';

const Page = () => {
  const [isConfirmingSeed, setIsConfirmingSeed] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isConfirmingReviewsSeed, setIsConfirmingReviewsSeed] = useState(false);

  const handleSeedClick = () => {
    if (isConfirmingSeed) {
      seedCars(10);

      setIsConfirmingSeed(false);
    } else {
      setIsConfirmingSeed(true);
    }
  };

  const handleReviewsSeedClick = async () => {
    if (isConfirmingReviewsSeed) {
      seedCarReviews();
      setIsConfirmingReviewsSeed(false);
    } else {
      setIsConfirmingReviewsSeed(true);
    }
  };

  const handleCancelReviewsSeedClick = () => {
    setIsConfirmingReviewsSeed(false);
  };

  const handleCancelSeedClick = () => {
    setIsConfirmingSeed(false);
  };

  const handleDeleteClick = async () => {
    if (isConfirmingDelete) {
      try {
        await deleteAllCars();
        alert('All cars deleted successfully!');
        setIsConfirmingDelete(false);
      } catch (error) {
        console.error(error);
        alert('Failed to delete all cars.');
      }
    } else {
      setIsConfirmingDelete(true);
    }
  };

  const handleCancelDeleteClick = () => {
    setIsConfirmingDelete(false);
  };

  return (
    <div className="flex h-[23rem] flex-col items-center justify-center bg-gray-300 py-[20rem]">
      <h1 className="mb-4 text-center text-2xl font-bold text-red-500 underline">
        Data Base Administration Page
      </h1>
      <p className="mb-6 text-[2rem] text-black">
        This page is for administration purposes only.
      </p>
      <div className="mb-4 flex space-x-12">
        <button
          onClick={handleSeedClick}
          className="bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {isConfirmingSeed ? 'Confirm Seed' : 'Seed Cars'}
        </button>
        {isConfirmingSeed && (
          <button
            onClick={handleCancelSeedClick}
            className="bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
          >
            Cancel Seed
          </button>
        )}
      </div>
      <div className="mb-4 flex space-x-12">
        <button
          onClick={handleReviewsSeedClick}
          className="bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          {isConfirmingReviewsSeed ? 'Confirm Seed Reviews' : 'Seed Reviews'}
        </button>
        {isConfirmingReviewsSeed && (
          <button
            onClick={handleCancelReviewsSeedClick}
            className="bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
          >
            Cancel Seed
          </button>
        )}
      </div>
      <div className="flex space-x-12">
        <button
          onClick={handleDeleteClick}
          disabled={false}
          className="bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {isConfirmingDelete ? 'Confirm Delete' : 'Delete All Cars'}
        </button>
        {isConfirmingDelete && (
          <button
            onClick={handleCancelDeleteClick}
            className="bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
          >
            Cancel Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;

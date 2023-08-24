'use client';

import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { CarFormButtonsProps } from '@/lib/interfaces';

const DeleteConfirmation = ({
  carIdFromPath,
  handleDelete,
  setIsConfirmingDelete,
  setIsLoading,
}: Pick<
  CarFormButtonsProps,
  'carIdFromPath' | 'handleDelete' | 'setIsConfirmingDelete' | 'setIsLoading'
>) => {
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isDeleting) {
      const deleteCar = async () => {
        try {
          setIsLoading(true);
          await handleDelete(carIdFromPath!);
          setIsConfirmingDelete(false);
        } catch (error) {
          console.error('Error deleting car:', error);
        } finally {
          setIsLoading(false);
          setIsDeleting(false);
        }
      };

      deleteCar();
    }
  }, [
    isDeleting,
    setIsLoading,
    handleDelete,
    carIdFromPath,
    setIsConfirmingDelete,
  ]);

  return (
    <div className="flex space-x-4">
      <Button
        className="flex self-end bg-red-500 p-5 text-white sm:w-auto"
        onClick={() => setIsDeleting(true)}
      >
        Confirm Delete
      </Button>
      <Button
        className="flex w-full self-end bg-gray-500 p-5 text-white md:w-auto"
        onClick={() => setIsConfirmingDelete(false)}
      >
        Cancel Delete
      </Button>
    </div>
  );
};

const CarFormButtons: React.FC<CarFormButtonsProps> = ({
  pathname,
  carIdFromPath,
  handleDelete,
  setIsConfirmingDelete,
  isConfirmingDelete,
  setIsLoading,
  isLoading,
}) => {
  return (
    <div className="flex w-full justify-end space-x-4 self-end">
      {pathname === `/cars/${carIdFromPath}` && carIdFromPath && (
        <>
          {isConfirmingDelete ? (
            <DeleteConfirmation
              carIdFromPath={carIdFromPath}
              handleDelete={handleDelete}
              setIsConfirmingDelete={setIsConfirmingDelete}
              setIsLoading={setIsLoading}
            />
          ) : (
            <Button
              className="flex w-full self-end bg-red-500 p-5 text-white md:w-auto"
              onClick={() => setIsConfirmingDelete(true)}
            >
              Delete Car
            </Button>
          )}
          <Button
            className="flex w-full bg-blue500 p-5 text-white md:w-auto"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Car'}
          </Button>
        </>
      )}
      {pathname === `/cars/new` && (
        <Button
          className="flex w-full bg-blue500 p-5 text-white md:w-auto"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register Car'}
        </Button>
      )}
    </div>
  );
};

export default CarFormButtons;

'use client';

import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

import { UserButton, currentUser } from '@clerk/nextjs';
import { fetchUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import Advert from '@/components/Advert';

const Home = () => {
  const { toast: showToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      let info;
      try {
        info = await currentUser();
        if (!info) throw new Error('User not authenticated.');

        const userInfo = await fetchUser(info?.id);
        if (!userInfo?.onboarded) redirect('/onboarding');
      } catch (error) {
        console.error(error);
        if (error instanceof Error && error.message) {
          showToast({
            title: 'Error',
            description: error?.message,
          });
        } else {
          showToast({
            title: 'Error',
            description: 'An unexpected error occurred.',
          });
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-600 p-10">
      <UserButton afterSignOutUrl="/" />
      <section className="flex w-full max-w-7xl">
        <div className="flex w-full flex-col gap-8 lg:flex-row">
          <Advert
            title="The Best Platform for Car Rental"
            description="Ease of doing a car rental safely and reliably. Of course at a low
          price."
            imageSrc="/pngs/advertWhiteCar.png"
            additionalStyles="white_car_ad"
          />
          <Advert
            title="Easy way to rent a car at a low price"
            description="Providing cheap car rental services and safe and comfortable facilities."
            imageSrc="/pngs/advertSilverCar.png"
            additionalStyles="black_car_ad hidden lg:flex"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;

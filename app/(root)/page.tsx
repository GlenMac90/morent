import { UserButton, currentUser } from '@clerk/nextjs';
import { fetchUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import Advert from '@/components/Advert';

const Home = async () => {
  let info;
  try {
    info = await currentUser();
  } catch (error) {
    console.error('Error fetching current user:', error);
    return <div>Error fetching user data.</div>;
  }

  if (!info) return <div>User not authenticated.</div>;

  let userInfo;
  try {
    userInfo = await fetchUser(info?.id);
  } catch (error) {
    console.error('Error fetching MongoDB user data:', error);
    return <div>Error fetching MongoDB user data.</div>;
  }

  if (!userInfo?.onboarded) redirect('/onboarding');

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

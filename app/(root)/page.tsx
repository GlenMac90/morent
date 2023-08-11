import { UserButton } from "@clerk/nextjs";
import Advert from "@/components/Advert";

export default function Home() {
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
}

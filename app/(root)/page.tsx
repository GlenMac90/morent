import PickUpDropOffCard from "@/components/PickUpDropOffCard";
import AdvertsDisplay from "@/components/advertsComponents/AdvertsDisplay";
import PopularCars from "@/components/homepageComponents/PopularCars";
import RecommendedCars from "@/components/homepageComponents/RecommendedCars";
import {
  fetchPopularCars,
  fetchRecommendedCars,
} from "@/lib/actions/car.actions";

const Home = async () => {
  const popularCars = await fetchPopularCars();
  console.log(popularCars);
  const recommendedCars = await fetchRecommendedCars();
  console.log(recommendedCars);
  return (
    <main className="flex flex-col items-center bg-white200 p-2 dark:bg-gray900">
      <div className="mt-24 flex w-full max-w-[90rem] flex-col items-center pt-5">
        <AdvertsDisplay />
        <div className="mt-7 flex w-full px-5">
          <PickUpDropOffCard />
        </div>
        <PopularCars popularCars={popularCars} />
        <RecommendedCars recommendedCars={popularCars} />
      </div>
    </main>
  );
};

export default Home;

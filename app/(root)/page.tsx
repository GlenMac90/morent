import { UserButton } from "@clerk/nextjs";
import CarCard from "@/components/CarCard";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-white200 p-2">
      <UserButton afterSignOutUrl="/" />
      <p className="">Hello World!</p>
      <div className="flex w-full max-w-7xl flex-col items-center p-5">
        <div className="flex w-full justify-between">
          <p className="ml-4 font-medium text-gray400">Popular Cars</p>
          <p className="mr-4 font-medium text-blue500">View All</p>
        </div>
        <div className="no_scrollbar mt-5 flex w-full items-center gap-5 overflow-x-auto sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {[0, 1, 2, 3].map((card) => (
            <CarCard key={card} isPopularCar={true} />
          ))}
        </div>
        <div className="mt-8 flex w-full justify-start">
          <p className="ml-4 font-medium text-gray400">Recommended cars</p>
        </div>
        <div className="mt-6 flex w-full flex-col items-center gap-5 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((card) => (
            <CarCard key={card} />
          ))}
        </div>
      </div>
    </div>
  );
}

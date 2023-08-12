import { UserButton } from "@clerk/nextjs";
import CarCard from "@/components/CarCard";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-white200 p-2">
      <UserButton afterSignOutUrl="/" />
      <p className="">Hello World!</p>
      <div className="flex w-full max-w-7xl flex-col items-center pt-5">
        <div className="flex w-full justify-between px-5">
          <p className="font-medium text-gray400">Popular Cars</p>
          <p className="font-medium text-blue500">View All</p>
        </div>
        <div className="no_scrollbar mt-4 flex w-full items-center justify-center gap-5 overflow-x-auto xs:mt-0 xs:flex-col xs:p-5 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          <div className="absolute right-0 h-60 w-20 bg-gradient-to-r from-transparent to-white/100 xs:hidden"></div>
          <div className="ml-[46.5rem] flex xs:hidden" />
          {[0, 1, 2, 3].map((card) => (
            <CarCard key={card} isPopularCar={true} />
          ))}
        </div>
        <p className="ml-5 mt-5 self-start font-medium text-gray400 xs:mt-0">
          Recommended cars
        </p>
        <div className="mt-5 flex w-full flex-col items-center gap-5 px-5 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((card) => (
            <CarCard key={card} />
          ))}
        </div>
        <button className="mt-10 rounded-md bg-blue500 px-10 py-4 text-sm font-medium text-white">
          Show More Cars
        </button>
      </div>
    </div>
  );
}

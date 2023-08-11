// import { UserButton } from "@clerk/nextjs";
import CarCard from "@/components/CarCard";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-white200 p-2">
      {/* <UserButton afterSignOutUrl="/" /> */}
      <p className="">Hello World!</p>
      <div className="flex w-full max-w-7xl flex-col items-center pt-5">
        <div className="flex w-full justify-between px-5">
          <p className="ml-4 font-medium text-gray400">Popular Cars</p>
          <p className="mr-4 font-medium text-blue500">View All</p>
        </div>
        <div className="no_scrollbar mt-5 flex w-full items-center justify-center gap-5 overflow-x-auto pl-5 sm:grid sm:grid-cols-2 sm:gap-6 md:p-5 lg:grid-cols-3 xl:grid-cols-4">
          <div className="absolute right-0 h-60 w-20 bg-gradient-to-r from-transparent to-white/100 sm:hidden"></div>
          <div className="ml-[41rem] flex xs:ml-[32rem] sm:hidden" />
          {[0, 1, 2, 3].map((card) => (
            <CarCard key={card} isPopularCar={true} />
          ))}
        </div>
        <p className="ml-9 mt-8 self-start font-medium text-gray400">
          Recommended cars
        </p>
        <div className="mt-6 flex w-full flex-col items-center gap-5 px-5 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((card) => (
            <CarCard key={card} />
          ))}
        </div>
      </div>
    </div>
  );
}

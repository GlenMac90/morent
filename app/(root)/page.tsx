import { UserButton } from "@clerk/nextjs";
import AdvertOne from "@/components/AdvertOne";
import AdvertTwo from "@/components/AdvertTwo";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-600 p-10">
      <UserButton afterSignOutUrl="/" />
      <section className="flex w-full max-w-7xl">
        <div className="flex w-full flex-col gap-8 lg:flex-row">
          <AdvertOne />
          <AdvertTwo />
        </div>
      </section>
    </div>
  );
}

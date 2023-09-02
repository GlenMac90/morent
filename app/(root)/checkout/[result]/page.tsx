"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import PaymentResult from "@/components/transitionPages/PaymentResult";
import { editCarDisabledDates } from "@/lib/actions/car.actions";
import { addRentedCarToUser } from "@/lib/actions/user.actions";

const Page = ({
  params,
  searchParams,
}: {
  params: { result: string };
  searchParams: { carId: string; userId: string; date: string };
}) => {
  const router = useRouter();
  const carId = searchParams.carId;
  const userId = searchParams.userId;
  const parsedDate = JSON.parse(searchParams.date);
  const dateObject = {
    from: new Date(parsedDate.from),
    to: new Date(parsedDate.to),
  };
  console.log(dateObject);
  console.log(params);
  console.log(searchParams.carId);
  console.log(searchParams.userId);

  const loadData = async () => {
    try {
      await editCarDisabledDates(carId, dateObject);
      await addRentedCarToUser(userId, carId);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  useEffect(() => {
    loadData();

    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const { result } = params;
  return <PaymentResult result={result} />;
};

export default Page;

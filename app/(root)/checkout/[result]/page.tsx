import { redirect } from "next/navigation";

import PaymentResult from "@/components/transitionPages/PaymentResult";
import { editCarDisabledDates } from "@/lib/actions/car.actions";
import { addRentedCarToUser } from "@/lib/actions/user.actions";

const Page = async ({
  params,
  searchParams,
}: {
  params: { result: string };
  searchParams: { carId: string; userId: string; date: string };
}) => {
  const { result } = params;
  const carId = searchParams.carId;
  const userId = searchParams.userId;
  const parsedDate = JSON.parse(searchParams.date);
  const dateObject = {
    from: new Date(parsedDate.from),
    to: new Date(parsedDate.to),
  };
  const loadData = async () => {
    try {
      await editCarDisabledDates(carId, dateObject);
      await addRentedCarToUser(userId, carId);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const data = await loadData();

  if (data) {
    setTimeout(() => {
      redirect("/");
    }, 3000);
  }
  return <PaymentResult result={result} />;
};

export default Page;

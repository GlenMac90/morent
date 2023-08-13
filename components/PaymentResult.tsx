import React from "react";
import Image from "next/image";

import {
  StripeSuccessImage,
  StripeErrorImage,
  StripeCancelImage,
} from "@/public/pngs";

interface PaymentResultProps {
  result: string;
}

const PaymentResult: React.FC<PaymentResultProps> = ({ result }) => {
  let imageSrc = StripeSuccessImage;
  if (result === "Error") {
    imageSrc = StripeErrorImage;
  } else if (result === "Cancel") {
    imageSrc = StripeCancelImage;
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center px-2">
      <section className="flex w-full flex-col items-center justify-center rounded-lg px-4 py-10 sm:w-auto sm:p-12">
        <p className="font-medium text-gray400 sm:text-lg">
          {result === "Success" && "Thank You For Your Purchase"}
          {result === "Error" && "There was an error making payment"}
          {result === "Cancel" && "You cancelled the payment"}
        </p>
        <Image
          src={imageSrc}
          alt=""
          className="mt-8 h-[7rem] w-[7rem] sm:h-[7.5rem] sm:w-[7.5rem]"
        />
        <p className="mt-8 text-2xl font-semibold sm:text-4xl">
          {result === "Success" && "Payment Successful"}
          {result === "Error" && "Payment Unsuccessful"}
          {result === "Cancel" && "Payment Cancelled"}
        </p>
        <button className="mt-8 w-full rounded-lg bg-blue500 py-4 font-semibold text-white sm:w-[25rem]">
          {result === "Success" && "View Rented Car"}
          {result === "Error" && "Try Again"}
          {result === "Cancel" && "Back To Homepage"}
        </button>
        <button className="mt-2 w-full rounded-lg py-4 text-lg text-gray-400 sm:w-[25rem]">
          {result === "Success" ? "Generate Receipt" : "Go Back"}
        </button>
      </section>
    </div>
  );
};

export default PaymentResult;

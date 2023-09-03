"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { calculateOrderAmount } from "@/utils/utility.functions";

interface CheckoutFormProps {
  clientSecret: string;
  price: string;
  totalDays: string;
  date: string;
  carId: string;
}

export default function CheckoutForm({
  clientSecret,
  price,
  totalDays,
  date,
  carId,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { userId } = useAuth();
  const pathname = usePathname();

  // Simplified date handling
  const parsedDate = JSON.parse(date);
  const dateObject = {
    from: new Date(parsedDate.from),
    to: new Date(parsedDate.to),
  };

  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe || !clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Success");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Error");
          break;
        default:
          setMessage("An unexpected error occurred.");
          break;
      }
    });
  }, [stripe, clientSecret]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setMessage("Stripe has not loaded correctly.");
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/checkout/Success?userId=${userId}&carId=${carId}&date=${date}`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="flex w-full items-center justify-center bg-white200 pb-10 pt-[8rem]">
      <form id="payment-form" onSubmit={handleSubmit}>
        <h1 className="text-base font-extrabold text-blue500">Card Details</h1>
        <section className="py-8">
          <LinkAuthenticationElement
            id="link-authentication-element"
            onChange={(e) => setEmail(e.target.value)}
          />
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
          />
        </section>
        <button
          className="w-full rounded-lg bg-blue500 py-4 text-white"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isLoading
              ? "Processing..."
              : `Pay $${calculateOrderAmount(totalDays, price) / 100}`}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}

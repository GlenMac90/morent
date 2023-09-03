'use client';

import React from 'react';
import {
  StripeElementsOptionsClientSecret,
  loadStripe,
} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from '@/components/CheckoutForm';

type PageProps = {
  searchParams: {
    price: number;
    totalDays: number;
    date: string;
    id: string;
  };
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const Page: React.FC<PageProps> = ({ searchParams }) => {
  const { price, totalDays, date, id: carId } = searchParams;
  const [clientSecret, setClientSecret] = React.useState('');

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          price,
          totalDays,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe' as const,
  };

  const options: StripeElementsOptionsClientSecret = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            price={price}
            totalDays={totalDays}
            date={date}
            carId={carId}
            clientSecret={clientSecret}
          />
        </Elements>
      )}
    </div>
  );
};

export default Page;

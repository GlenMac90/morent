import React from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import { calculateOrderAmount } from '@/utils/utility.functions';

interface CheckoutFormProps {
  clientSecret: string;
  price: string;
  totalDays: string;
}

export default function CheckoutForm({
  clientSecret,
  price,
  totalDays,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Success');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Error');
          break;
        default:
          setMessage('Error');
          break;
      }
    });
  }, [stripe, clientSecret]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `http://localhost:3000/checkout/[result]`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <div className=' flex w-full items-center justify-center bg-white200 pb-10 pt-[8rem]'>
      <form id='payment-form' onSubmit={handleSubmit}>
        <h1 className='text-base font-extrabold text-blue500'>Card Details</h1>
        <section className='py-8'>
          <LinkAuthenticationElement
            id='link-authentication-element'
            onChange={(e) => setEmail(e.target.value)}
          />
          <PaymentElement
            id='payment-element'
            options={paymentElementOptions}
          />
        </section>
        <button
          className='w-full rounded-lg bg-blue500 py-4 text-white'
          disabled={isLoading || !stripe || !elements}
          id='submit'
        >
          <span id='button-text'>
            {isLoading ? (
              <div></div>
            ) : (
              `Pay $${calculateOrderAmount(totalDays, price) / 100}`
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id='payment-message'>{message}</div>}
      </form>
    </div>
  );
}
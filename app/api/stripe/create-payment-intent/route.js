import { NextResponse } from 'next/server';

import { calculateOrderAmount } from '@/utils/utility.functions';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req, res) {
  const { data } = await req.json();
  const { price, totalDays } = data;

  const orderTotal = calculateOrderAmount(totalDays, price);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: orderTotal,
    currency: 'eur',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}

import { loadStripe, Stripe as StripeClient } from '@stripe/stripe-js';

let stripePromise: Promise<StripeClient | null> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    const key = (import.meta as any).env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (!key || key === 'undefined') {
      console.error('VITE_STRIPE_PUBLISHABLE_KEY is missing. Please set it in the environment variables.');
      return null;
    }
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

export const createPaymentIntent = async (amount: number, currency: string = 'usd', metadata: any = {}) => {
  try {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, currency, metadata }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create payment intent');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

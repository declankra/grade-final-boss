// src/app/api/character/payment/route.ts
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { getSupabase } from '@/lib/supabase';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(
  process.env.NODE_ENV === 'production'
    ? process.env.STRIPE_SECRET_KEY!
    : process.env.STRIPE_SECRET_KEY_DEV!,
  { 
    apiVersion: '2024-12-18.acacia'
  }
);

export async function POST(request: NextRequest) {
  try {
    // 1. {}

    // 2. Fetch user data from Supabase to include in metadata

    // 3. Create the Stripe Checkout Session
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Grade Final Boss - Early Bird Lifetime Access',
                description: 'One-time payment for lifetime access to use Grade Final Boss.com for grade planning and execution. All new features and improvements will be included, forever.',
              },
              unit_amount: 699, // $6.99 in cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/canceled`,
        payment_method_types: ['card'],
        metadata: {
        },
      };
    // 3. Create the Stripe Checkout Session
    const session = await stripe.checkout.sessions.create(sessionParams);

    // 4. Store the Stripe session ID in Supabase for verification


    // 5. Return the session ID to the client
    return new Response(
      JSON.stringify({
        sessionId: session.id,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Payment initialization error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to initialize payment' }),
      { status: 500 }
    );
  }
}

// For completeness, your GET endpoint stays the same if you want to check status
export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id');
  
  if (!sessionId) {
    return new Response(
      JSON.stringify({ error: 'No session ID provided' }),
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return new Response(
      JSON.stringify({
        status: session.status,
        payment_status: session.payment_status
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving session:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to retrieve session status' }),
      { status: 500 }
    );
  }
}

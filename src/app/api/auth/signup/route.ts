// src/app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    // Extract the required fields from the request body
    const body = await request.json();
    const { email, password, name } = body;

    // Add debug logging
    console.log('Signup request received:', { 
      email: email ? 'provided' : 'missing',
      password: password ? 'provided' : 'missing',
      name: name ? 'provided' : 'missing'
    });

    if (!email || !password) {
      console.error('Validation failed:', { email: !!email, password: !!password });
      return NextResponse.json(
        { error: 'Missing required fields: ' + (!email ? 'email ' : '') + (!password ? 'password' : '') },
        { status: 400 }
      );
    }

    // Create a Supabase server client using the utility function
    const supabase = await createClient();

    // Call the signUp method with email, password and additional user data
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/confirm`,
      },
    });

    if (error) {
      console.error('Supabase signup error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // After successful signup, call the upsert endpoint to create/update user record
    if (data?.user) {
      try {
        const upsertResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/upsert`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: data.user.id,
            email: data.user.email,
            name: name || data.user.email,
          }),
        });

        if (!upsertResponse.ok) {
          console.error('Failed to upsert user data:', await upsertResponse.text());
        }
      } catch (upsertError) {
        console.error('Error during upsert:', upsertError);
      }
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (err: any) {
    console.error('Signup error:', err);
    return NextResponse.json({ 
      error: err.message,
      details: err.stack 
    }, { status: 500 });
  }
}

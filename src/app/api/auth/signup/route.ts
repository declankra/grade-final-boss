// src/app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields: email and password are required.' },
        { status: 400 }
      );
    }

    // Create a Supabase server client (this passes the cookies automatically)
    const supabase = await createClient();

    // Call signUp with email and password. Note: if email confirmation is disabled in your Supabase settings,
    // a session is returned.
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        // Optional: change emailRedirectTo if you want users to verify via email.
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/confirm`,
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Optionally, upsert user data in your custom table (if needed)
    if (data?.user) {
      try {
        const upsertResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/upsert`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user_id: data.user.id,
              email: data.user.email,
              name: name || data.user.email,
            }),
          }
        );
        if (!upsertResponse.ok) {
          console.error('Upsert failed:', await upsertResponse.text());
        }
      } catch (upsertError) {
        console.error('Error during upsert:', upsertError);
      }
    }

    // Return the response. If a session exists (no email confirmation required), data.session will be truthy.
    return NextResponse.json({ data }, { status: 200 });
  } catch (err: any) {
    console.error('Signup error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// src/app/api/auth/signin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields: email and password are required.' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Use signInWithPassword to sign in the user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // On successful sign in, a session should be established and stored via cookies.
    return NextResponse.json({ data }, { status: 200 });
  } catch (err: any) {
    console.error('Signin error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

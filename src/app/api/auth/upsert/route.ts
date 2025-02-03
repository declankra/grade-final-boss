// src/app/api/auth/upsert/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase"; // Provided in your codebase

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, email, name } = body; // Additional fields can be sent as needed

    // Validate incoming data
    if (!user_id || !email) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const supabase = getSupabase();

    // Upsert user record into gfb_users table
    const { data, error } = await supabase
      .from("gfb_users")
      .upsert({
        user_id,
        email,
        name,
        last_login: new Date(),
      })
      .select("*");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// src/app/api/calculations/final-exams/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, input_data, calculated_final_score_needed } = body;

    // Basic validation
    if (!user_id || !input_data) {
      return NextResponse.json(
        { error: "Missing required user_id or input_data" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    // Insert new calculation
    const { data, error } = await supabase
      .from("gfb_final_exam_calculations")
      .insert([
        {
          user_id,
          input_data,
          calculated_final_score_needed,
        },
      ])
      .select("*");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

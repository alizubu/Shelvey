export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { Social }       from "@/lib/models/Social";
import { seedDefaults } from "@/lib/db/seed";

export const revalidate = 60;

export async function GET() {
  await seedDefaults();
  const social = await Social.findOne().lean();
  return NextResponse.json(social);
}

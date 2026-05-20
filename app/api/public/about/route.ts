export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { About }        from "@/lib/models/About";
import { seedDefaults } from "@/lib/db/seed";

export const revalidate = 60;

export async function GET() {
  await seedDefaults();
  const about = await About.findOne().lean();
  return NextResponse.json(about);
}

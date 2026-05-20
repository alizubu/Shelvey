export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { Experience }   from "@/lib/models/Experience";
import { seedDefaults } from "@/lib/db/seed";

export const revalidate = 60;

export async function GET() {
  await seedDefaults();
  const items = await Experience.find().sort({ order: 1 }).lean();
  return NextResponse.json(items);
}

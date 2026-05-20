export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { Service }      from "@/lib/models/Service";
import { seedDefaults } from "@/lib/db/seed";

export const revalidate = 60;

export async function GET() {
  await seedDefaults();
  const items = await Service.find().sort({ order: 1 }).lean();
  return NextResponse.json(items);
}

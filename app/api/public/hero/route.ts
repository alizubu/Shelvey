export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { Hero }         from "@/lib/models/Hero";
import { seedDefaults } from "@/lib/db/seed";

export const revalidate = 60; // ISR — revalidate every 60s

export async function GET() {
  await seedDefaults();
  const hero = await Hero.findOne().lean();
  return NextResponse.json(hero);
}

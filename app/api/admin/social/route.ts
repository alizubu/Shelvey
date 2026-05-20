export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { connectDB }    from "@/lib/db/mongoose";
import { Social }       from "@/lib/models/Social";
import { requireAdmin } from "@/lib/apiGuard";
import { sanitizeDeep } from "@/lib/sanitize";
import { seedDefaults } from "@/lib/db/seed";

export async function GET() {
  if (!process.env.MONGODB_URI) return NextResponse.json(null);
  await seedDefaults();
  const social = await Social.findOne().lean();
  return NextResponse.json(social);
}

export async function PUT(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  await connectDB();
  const body = sanitizeDeep(await req.json());
  const social = await Social.findOneAndUpdate({}, body, { new: true, upsert: true }).lean();
  return NextResponse.json(social);
}

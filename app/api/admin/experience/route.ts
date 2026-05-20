export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { connectDB }    from "@/lib/db/mongoose";
import { Experience }   from "@/lib/models/Experience";
import { requireAdmin } from "@/lib/apiGuard";
import { sanitizeDeep } from "@/lib/sanitize";
import { seedDefaults } from "@/lib/db/seed";

export async function GET() {
  if (!process.env.MONGODB_URI) return NextResponse.json([]);
  await seedDefaults();
  const items = await Experience.find().sort({ order: 1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  await connectDB();
  const body = sanitizeDeep(await req.json());
  const count = await Experience.countDocuments();
  const item = await Experience.create({ ...body, order: count });
  return NextResponse.json(item, { status: 201 });
}

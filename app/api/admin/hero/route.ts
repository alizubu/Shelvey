export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { connectDB }   from "@/lib/db/mongoose";
import { Hero }        from "@/lib/models/Hero";
import { requireAdmin } from "@/lib/apiGuard";
import { sanitizeDeep } from "@/lib/sanitize";
import { seedDefaults } from "@/lib/db/seed";

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) return NextResponse.json(null);
    await seedDefaults();
    const hero = await Hero.findOne().lean();
    return NextResponse.json(hero);
  } catch (err) {
    console.error("[GET /api/admin/hero]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    await connectDB();
    const body = sanitizeDeep(await req.json());
    const hero = await Hero.findOneAndUpdate({}, body, { new: true, upsert: true }).lean();
    return NextResponse.json(hero);
  } catch (err) {
    console.error("[PUT /api/admin/hero]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

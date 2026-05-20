import { NextRequest, NextResponse } from "next/server";
import { connectDB }    from "@/lib/db/mongoose";
import { Experience }   from "@/lib/models/Experience";
import { requireAdmin } from "@/lib/apiGuard";
import { sanitizeDeep } from "@/lib/sanitize";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const guard = await requireAdmin();
  if (guard) return guard;

  await connectDB();
  const body = sanitizeDeep(await req.json());
  const item = await Experience.findByIdAndUpdate(params.id, body, { new: true }).lean();
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const guard = await requireAdmin();
  if (guard) return guard;

  await connectDB();
  await Experience.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}

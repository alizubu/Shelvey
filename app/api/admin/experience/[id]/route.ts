import { NextRequest, NextResponse } from "next/server";
import { connectDB }    from "@/lib/db/mongoose";
import { Experience }   from "@/lib/models/Experience";
import { requireAdmin } from "@/lib/apiGuard";
import { sanitizeDeep } from "@/lib/sanitize";
import mongoose         from "mongoose";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await connectDB();
    const body = sanitizeDeep(await req.json());
    const item = await Experience.findByIdAndUpdate(params.id, body, { new: true }).lean();
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
  } catch (err) {
    console.error("[PUT /api/admin/experience/:id]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await connectDB();
    await Experience.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/admin/experience/:id]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

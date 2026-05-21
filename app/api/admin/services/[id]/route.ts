import { NextRequest, NextResponse } from "next/server";
import { connectDB }    from "@/lib/db/mongoose";
import { Service }      from "@/lib/models/Service";
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
    const item = await Service.findByIdAndUpdate(params.id, body, { new: true }).lean();
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
  } catch (err) {
    console.error("[PUT /api/admin/services/:id]", err);
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
    await Service.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/admin/services/:id]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

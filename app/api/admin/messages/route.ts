export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { connectDB }    from "@/lib/db/mongoose";
import { Message }      from "@/lib/models/Message";
import { requireAdmin } from "@/lib/apiGuard";

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  if (!process.env.MONGODB_URI) return NextResponse.json([]);

  await connectDB();
  const messages = await Message.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(messages);
}

export async function DELETE() {
  const guard = await requireAdmin();
  if (guard) return guard;

  await connectDB();
  await Message.deleteMany({});
  return NextResponse.json({ success: true });
}

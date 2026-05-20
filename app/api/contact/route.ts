export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { connectDB }   from "@/lib/db/mongoose";
import { Message }     from "@/lib/models/Message";
import { sanitizeDeep } from "@/lib/sanitize";

export async function POST(req: NextRequest) {
  try {
    const body = sanitizeDeep(await req.json());
    const { name, email, message } = body as { name: string; email: string; message: string };

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    // If no DB configured, still return success (just don't persist)
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ success: true });
    }

    await connectDB();
    await Message.create({ name, email, message });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}

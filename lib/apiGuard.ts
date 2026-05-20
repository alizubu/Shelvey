import { auth } from "@/auth";
import { NextResponse } from "next/server";

/** Returns 401 JSON response if the request is not authenticated. */
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

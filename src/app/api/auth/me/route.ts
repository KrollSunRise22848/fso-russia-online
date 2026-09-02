import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const store = await cookies();
    const token = store.get(SESSION_COOKIE)?.value;
    const payload = verifySessionToken(token);
    if (!payload) {
      return NextResponse.json({ ok: false, admin: null });
    }
    const admin = await db.admin.findUnique({
      where: { id: payload.adminId },
      select: { id: true, username: true, name: true, role: true },
    });
    if (!admin) {
      return NextResponse.json({ ok: false, admin: null });
    }
    return NextResponse.json({ ok: true, admin });
  } catch {
    return NextResponse.json({ ok: false, admin: null });
  }
}

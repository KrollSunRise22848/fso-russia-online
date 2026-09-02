import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { db } from "@/lib/db";

export async function getAdmin(): Promise<{ id: string; username: string; role: string } | null> {
  try {
    const store = await cookies();
    const token = store.get(SESSION_COOKIE)?.value;
    const payload = verifySessionToken(token);
    if (!payload) return null;
    const admin = await db.admin.findUnique({
      where: { id: payload.adminId },
      select: { id: true, username: true, role: true },
    });
    return admin ?? null;
  } catch {
    return null;
  }
}

export function unauthorized() {
  return Response.json({ error: "Необходима авторизация администратора" }, { status: 401 });
}

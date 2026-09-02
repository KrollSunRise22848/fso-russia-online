import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword, createSessionToken, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Введите логин и пароль" }, { status: 400 });
    }
    const admin = await db.admin.findUnique({ where: { username: String(username).trim() } });
    if (!admin || !verifyPassword(password, admin.password)) {
      return NextResponse.json({ error: "Неверный логин или пароль" }, { status: 401 });
    }
    const token = createSessionToken({
      adminId: admin.id,
      username: admin.username,
      role: admin.role,
    });
    const res = NextResponse.json({
      ok: true,
      admin: { id: admin.id, username: admin.username, name: admin.name, role: admin.role },
    });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (e) {
    console.error("login error", e);
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}

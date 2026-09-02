import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdmin } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit")) || 100;
    const admin = await getAdmin();
    const where = admin ? undefined : { published: true };
    const orders = await db.order.findMany({
      where,
      orderBy: [{ createdAt: "desc" }],
      take: limit,
    });
    return NextResponse.json({ orders });
  } catch (e) {
    console.error("orders GET", e);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdmin();
    if (!admin) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    const body = await req.json();
    const { number, title, summary, content, category, signedBy, signedRole, status, published } = body;
    if (!number || !title || !summary || !content || !signedBy) {
      return NextResponse.json({ error: "Заполните обязательные поля" }, { status: 400 });
    }
    const existing = await db.order.findUnique({ where: { number: String(number).trim() } });
    if (existing) {
      return NextResponse.json({ error: "Приказ с таким номером уже существует" }, { status: 400 });
    }
    const order = await db.order.create({
      data: {
        number: String(number).trim(),
        title: String(title).trim(),
        summary: String(summary).trim(),
        content: String(content),
        category: category || "Общий",
        signedBy: String(signedBy).trim(),
        signedRole: String(signedRole || "").trim(),
        status: status || "Действует",
        published: published !== false,
      },
    });
    return NextResponse.json({ ok: true, order });
  } catch (e) {
    console.error("orders POST", e);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

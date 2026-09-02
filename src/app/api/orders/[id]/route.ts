import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdmin } from "@/lib/api-auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await db.order.findUnique({ where: { id } });
    if (!order || (!order.published && !(await getAdmin()))) {
      return NextResponse.json({ error: "Не найдено" }, { status: 404 });
    }
    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdmin();
    if (!admin) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    const { id } = await params;
    const body = await req.json();
    const { number, title, summary, content, category, signedBy, signedRole, status, published } = body;
    const data: Record<string, unknown> = {};
    if (number !== undefined) {
      const existing = await db.order.findUnique({ where: { number: String(number).trim() } });
      if (existing && existing.id !== id) {
        return NextResponse.json({ error: "Приказ с таким номером уже существует" }, { status: 400 });
      }
      data.number = String(number).trim();
    }
    if (title !== undefined) data.title = String(title).trim();
    if (summary !== undefined) data.summary = String(summary).trim();
    if (content !== undefined) data.content = String(content);
    if (category !== undefined) data.category = category;
    if (signedBy !== undefined) data.signedBy = String(signedBy).trim();
    if (signedRole !== undefined) data.signedRole = String(signedRole).trim();
    if (status !== undefined) data.status = status;
    if (published !== undefined) data.published = Boolean(published);
    const order = await db.order.update({ where: { id }, data });
    return NextResponse.json({ ok: true, order });
  } catch (e) {
    console.error("orders PATCH", e);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdmin();
    if (!admin) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    const { id } = await params;
    await db.order.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Ошибка удаления" }, { status: 500 });
  }
}

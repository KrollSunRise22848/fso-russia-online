import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdmin } from "@/lib/api-auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const news = await db.news.findUnique({ where: { id } });
    if (!news || (!news.published && !(await getAdmin()))) {
      return NextResponse.json({ error: "Не найдено" }, { status: 404 });
    }
    return NextResponse.json({ news });
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
    const { title, summary, content, category, imageUrl, isPinned, published } = body;
    const data: Record<string, unknown> = {};
    if (title !== undefined) data.title = String(title).trim();
    if (summary !== undefined) data.summary = String(summary).trim();
    if (content !== undefined) data.content = String(content);
    if (category !== undefined) data.category = category;
    if (imageUrl !== undefined) data.imageUrl = imageUrl || null;
    if (isPinned !== undefined) data.isPinned = Boolean(isPinned);
    if (published !== undefined) data.published = Boolean(published);
    const news = await db.news.update({ where: { id }, data });
    return NextResponse.json({ ok: true, news });
  } catch (e) {
    console.error("news PATCH", e);
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
    await db.news.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Ошибка удаления" }, { status: 500 });
  }
}

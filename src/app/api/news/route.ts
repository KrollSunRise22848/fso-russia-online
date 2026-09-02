import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdmin } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit")) || 50;
    const admin = await getAdmin();
    const where = admin ? undefined : { published: true };
    const news = await db.news.findMany({
      where,
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
      take: limit,
    });
    return NextResponse.json({ news });
  } catch (e) {
    console.error("news GET", e);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdmin();
    if (!admin) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    const body = await req.json();
    const { title, summary, content, category, imageUrl, isPinned, published } = body;
    if (!title || !summary || !content) {
      return NextResponse.json({ error: "Заполните обязательные поля" }, { status: 400 });
    }
    const news = await db.news.create({
      data: {
        title: String(title).trim(),
        summary: String(summary).trim(),
        content: String(content),
        category: category || "Общее",
        imageUrl: imageUrl || null,
        isPinned: Boolean(isPinned),
        published: published !== false,
        authorId: admin.id,
      },
    });
    return NextResponse.json({ ok: true, news });
  } catch (e) {
    console.error("news POST", e);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

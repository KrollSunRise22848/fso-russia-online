import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdmin } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const department = searchParams.get("department");
    const admin = await getAdmin();
    const where: Record<string, unknown> = {};
    if (!admin) where.isActive = true;
    if (department) where.department = department;
    const leaders = await db.leader.findMany({
      where,
      orderBy: [{ orderNumber: "asc" }, { createdAt: "asc" }],
    });
    return NextResponse.json({ leaders });
  } catch (e) {
    console.error("leaders GET", e);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdmin();
    if (!admin) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    const body = await req.json();
    const { fullName, rank, position, department, orderNumber, bio, awards, imageUrl, isActive } = body;
    if (!fullName || !rank || !position || !department) {
      return NextResponse.json({ error: "Заполните обязательные поля" }, { status: 400 });
    }
    const leader = await db.leader.create({
      data: {
        fullName: String(fullName).trim(),
        rank: String(rank).trim(),
        position: String(position).trim(),
        department,
        orderNumber: Number(orderNumber) || 0,
        bio: bio || null,
        awards: awards || null,
        imageUrl: imageUrl || null,
        isActive: isActive !== false,
      },
    });
    return NextResponse.json({ ok: true, leader });
  } catch (e) {
    console.error("leaders POST", e);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

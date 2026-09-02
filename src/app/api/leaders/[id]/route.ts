import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdmin } from "@/lib/api-auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const leader = await db.leader.findUnique({ where: { id } });
    if (!leader) return NextResponse.json({ error: "Не найдено" }, { status: 404 });
    if (!leader.isActive && !(await getAdmin())) {
      return NextResponse.json({ error: "Не найдено" }, { status: 404 });
    }
    return NextResponse.json({ leader });
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
    const { fullName, rank, position, department, orderNumber, bio, awards, imageUrl, isActive } = body;
    const data: Record<string, unknown> = {};
    if (fullName !== undefined) data.fullName = String(fullName).trim();
    if (rank !== undefined) data.rank = String(rank).trim();
    if (position !== undefined) data.position = String(position).trim();
    if (department !== undefined) data.department = department;
    if (orderNumber !== undefined) data.orderNumber = Number(orderNumber) || 0;
    if (bio !== undefined) data.bio = bio || null;
    if (awards !== undefined) data.awards = awards || null;
    if (imageUrl !== undefined) data.imageUrl = imageUrl || null;
    if (isActive !== undefined) data.isActive = Boolean(isActive);
    const leader = await db.leader.update({ where: { id }, data });
    return NextResponse.json({ ok: true, leader });
  } catch (e) {
    console.error("leaders PATCH", e);
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
    await db.leader.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Ошибка удаления" }, { status: 500 });
  }
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id || !session.user?.email) {
    return new NextResponse("Not logged in", { status: 401 });
  }

  // 💡 Ensure user exists (create if not)
  const user = await prisma.user.upsert({
    where: { email: session.user.email },
    update: {},
    create: {
      id: session.user.id,
      email: session.user.email,
    },
  });

  const now = new Date();
  const expires = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 2); // 48h

  const site1 = await prisma.website.create({
    data: {
      domain: "dummy-site-1",
      html: "<h1>Dummy Site 1</h1>",
      template: "minimalist",
      isActive: true,
      deployedAt: now,
      expiresAt: expires,
      userId: user.id,
    },
  });

  const site2 = await prisma.website.create({
    data: {
      domain: "dummy-site-2",
      html: "<h1>Dummy Site 2</h1>",
      template: "business",
      isActive: true,
      deployedAt: now,
      expiresAt: expires,
      userId: user.id,
    },
  });

  return NextResponse.json({ success: true, site1, site2 });
}

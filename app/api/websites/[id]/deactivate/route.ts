// // app/api/websites/[id]/deactivate/route.ts
// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function POST(_: Request, { params }: { params: { id: string } }) {
//   try {
//     await prisma.website.update({
//       where: { id: params.id },
//       data: { isActive: false },
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
//   }
// }
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.website.update({
      where: { id: params.id },
      data: { isActive: false },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Deactivate error:", error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

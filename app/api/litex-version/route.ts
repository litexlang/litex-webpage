import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  return NextResponse.json(
    {
      data: process.env.LITEX_VERSION || "Beta",
    },
    { status: 200 }
  );
};

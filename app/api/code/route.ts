import { demoReader } from "@/app/lib/server/demoLoader";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  const requestParams = request.nextUrl.searchParams;
  const demoPath = requestParams.get("demoPath");
  if (demoPath) {
    return NextResponse.json(
      {
        data: demoReader(process.env.DEMO_DIR + demoPath + ".lix"),
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { error: "Server Internal Error" },
      { status: 500 }
    );
  }
};

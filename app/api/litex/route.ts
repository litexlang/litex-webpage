import { litexExecutor } from "@/app/lib/server/litexExecutor";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  const requestBody = await request.json();
  const targetFormat = requestBody.targetFormat;
  const litexString = requestBody.litexString;
  if (litexString) {
    return NextResponse.json(
      {
        data: await litexExecutor(targetFormat, litexString),
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

import { docReader } from "@/app/lib/server/docLoader";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  const requestParams = request.nextUrl.searchParams;
  const docPath = requestParams.get("docPath");
  if (docPath) {
    return NextResponse.json(
      {
        data: docReader(process.env.DOC_DIR + docPath + ".md"),
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

import { docReader } from "@/app/lib/server/docLoader";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  const requestParams = request.nextUrl.searchParams;
  const docId = requestParams.get("docId");
  if (docId) {
    return NextResponse.json(
      { data: docReader(process.env.DOC_DIR + docId) },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { error: "Server Internal Error" },
      { status: 500 }
    );
  }
};

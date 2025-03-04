import { menuTreeLoader } from "@/app/lib/server/docLoader";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  const requestParams = request.nextUrl.searchParams;
  const docName = requestParams.get("docName");
  if (docName) {
    return NextResponse.json(
      { data: menuTreeLoader(process.env.DOC_DIR + docName) },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { error: "Server Internal Error" },
      { status: 500 }
    );
  }
};

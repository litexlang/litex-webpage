import { menuTreeLoader } from "@/app/lib/server/docLoader";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const requestParams = request.nextUrl.searchParams;
  const docName = requestParams.get("docName");
  if (docName) {
    return NextResponse.json(
      { data: menuTreeLoader(docName) },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { error: "Server Internal Error" },
      { status: 500 }
    );
  }
};

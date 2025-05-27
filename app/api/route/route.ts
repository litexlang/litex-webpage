import { docRouteLoader } from "@/app/lib/server/docLoader";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const routeList = docRouteLoader();
  routeList.push(
    {
      title: "Playground",
      path: "https://litexlang.org:3000/lab",
    },
    {
      title: "Github",
      path: "https://github.com/litexlang/tslitex",
    }
  );
  return NextResponse.json({ data: routeList }, { status: 200 });
};

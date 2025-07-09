import { demoRouteLoader } from "@/app/lib/server/demoLoader";
import { docRouteLoader } from "@/app/lib/server/docLoader";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const routeList = []
  routeList.push(
    {
      title: "Homepage",
      path: "/",
    }
  );
  routeList.push(...docRouteLoader());
  routeList.push(demoRouteLoader());
  routeList.push(
    {
      title: "Github",
      path: "https://github.com/litexlang/tslitex",
    }
  );
  return NextResponse.json({ data: routeList }, { status: 200 });
};

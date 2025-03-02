import { docRouteLoader } from "@/app/lib/server/docLoader";
import { NextResponse } from "next/server";

export const GET = async () => {
  let routeList = docRouteLoader();
  routeList.push(
    {
      title: "Playground",
      path: "/playground",
    },
    {
      title: "Github",
      path: "https://github.com/litexlang/tslitex",
    }
  );
  return NextResponse.json({ data: routeList }, { status: 200 });
};

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
      path: "https://github.com/litexlang/golitex",
    },
    {
      title: "Zulip Community",
      path: "https://litex.zulipchat.com/join/c4e7foogy6paz2sghjnbujov",
    }
  );
  return NextResponse.json({ data: routeList }, { status: 200 });
};

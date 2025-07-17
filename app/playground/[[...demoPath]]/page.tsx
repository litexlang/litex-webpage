"use client";

import { Container } from "@mui/material";
import Playground from "../../ui/playground";

export default function Demo({
  params,
}: {
  params: { demoPath: Array<string> };
}) {
  // route vars
  const demoPath = params.demoPath ? params.demoPath.join("/") : undefined;

  return (
    <Container component={"main"} sx={{ p: 2 }} maxWidth={false}>
      <Playground height={"calc(100vh - 72px)"} demoPath={demoPath} />
    </Container>
  );
}

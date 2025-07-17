"use client";

import Content from "@/app/ui/doc/Content";
import { Container } from "@mui/material";

export default function Doc({
  params,
}: {
  params: { docPath: Array<string> };
}) {
  // route vars
  const docPath = params.docPath.join("/");

  return (
    <Container component={"main"} sx={{ p: 2 }} maxWidth={false}>
      <Content docPath={docPath} />
    </Container>
  );
}

"use client";

import { Container, Toolbar } from "@mui/material";
import Playground from "../ui/playground";
import litexExamples from "../lib/browser/litexExamples";

export default function Home() {

  return (
    <Container component={"main"} sx={{ p: 2 }} maxWidth={false}>
      <Toolbar />
      <Playground height={'calc(100vh - 160px)'} initCode={litexExamples[0].code} />
    </Container>
  );
}

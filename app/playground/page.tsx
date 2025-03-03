"use client";

import { Container, Toolbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../lib/browser/store/hooks";
import Playground from "../ui/playground";

export default function Home() {

  // redux vars
  const code = useAppSelector((state) => state.code.value);

  return (
    <Container component={"main"} sx={{ p: 2 }} maxWidth={false}>
      <Toolbar />
      <Playground height={'calc(100vh - 160px)'} initCode={code} />
    </Container>
  );
}

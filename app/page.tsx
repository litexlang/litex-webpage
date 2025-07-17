"use client";

import { Container } from "@mui/material";
import Content from "./ui/doc/Content";
export default function Home() {
  return (
    <Container component={"main"} sx={{ p: 2 }} maxWidth={false}>
      <Content docPath="homepage" />
    </Container>
  );
}

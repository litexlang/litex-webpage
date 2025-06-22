"use client";

import { Container, Toolbar } from "@mui/material";
import Content from "./ui/doc/Content";
export default function Home() {

    return (
        <Container component={"main"} sx={{ p: 2 }} maxWidth="md">
            <Toolbar />
            <Content docId={"homepage.md"} />
        </Container>
    );
}

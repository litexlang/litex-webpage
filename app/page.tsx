"use client";

import { Box, Container, Toolbar } from "@mui/material";
import Image from "next/image";
import logo from "./ui/homepage/logo.png"
import Content from "./ui/doc/Content";
export default function Home() {

    return (
        <Container component={"main"} sx={{ p: 2 }} maxWidth="md">
            <Toolbar />
            <Box sx={{ textAlign: "center", my: 3 }}>
                <Image src={logo} alt="" width={300} height={300} />
            </Box>
            <Content docId={"homepage.md"}  />
        </Container>
    );
}

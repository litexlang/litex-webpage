"use client";

import Content from "@/app/ui/doc/Content";
import MenuTree from "@/app/ui/doc/MenuTree";
import { Box, Container, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";

export default function Doc({ params }: { params: { docName: string } }) {

    // route vars
    const docName = params.docName

    // state vars
    const [menuTree, setMenuTree] = useState([])
    const [docId, setDocId] = useState("")

    const getFirstDocId = (menuTree: Array<any>) => {
        if (menuTree[0].children) {
            return getFirstDocId(menuTree[0].children)
        } else {
            return menuTree[0].id
        }
    }

    const menuTreeInit = () => {
        fetch("/api/doc-menu?" + new URLSearchParams({ docName })).then((resp) => {
            if (resp.status === 200) {
                resp.json().then((json) => {
                    setMenuTree(json.data);
                    setDocId(getFirstDocId(json.data))
                });
            }
        });
    }

    useEffect(() => { if (docName) menuTreeInit() }, [docName])

    return (
        <Container component={"main"} sx={{ p: 2 }} maxWidth={false}>
            <Toolbar />
            <Box display={"flex"}>
                <MenuTree menuTree={menuTree} width={240} docId={docId} setDocId={setDocId} />
                <Content docId={docId} />
            </Box>
        </Container>
    );
}
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import Playground from "../playground";

export default function Content({
    docId
}: {
    docId: string
}) {

    // state vars
    const [content, setContent] = useState("loading...")

    const contentInit = () => {
        fetch("/api/content?" + new URLSearchParams({ docId })).then((resp) => {
            if (resp.status === 200) {
                resp.json().then((json) => {
                    setContent(json.data);
                });
            }
        });
    }

    useEffect(() => { if (docId) contentInit() }, [docId])

    return (
        <Container maxWidth={"xl"}>
            <Markdown children={content} components={{
                code({ children, className, ...rest }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? <Playground height={300} initCode={String(children)} /> : <code {...rest} className={className}>{children}</code>
                }
            }} />
        </Container>
    )
}

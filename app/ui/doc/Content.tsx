import LitexRenderer from "@/app/lib/server/LitexRenderer";
import { Box } from "@mui/material";
import { Marked } from "@ts-stack/markdown";
import { useEffect, useState } from "react";

export default function Content({
    docId
}: {
    docId: string
}) {

    // state vars
    const [content, setContent] = useState("## loading...")

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

    Marked.setOptions({ renderer: new LitexRenderer })

    return <div dangerouslySetInnerHTML={{ __html: Marked.parse(content) }} />
}

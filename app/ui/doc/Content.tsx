import LitexRenderer from "@/app/lib/server/LitexRenderer";
import { Box } from "@mui/material";
import { Marked } from "@ts-stack/markdown";

export default function Content({
    content
}: {
    content: string
}) {

    Marked.setOptions({ renderer: new LitexRenderer })

    return <div dangerouslySetInnerHTML={{ __html: Marked.parse(content) }} />
}

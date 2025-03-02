import { Box } from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";

export default function MenuTree({
    menuTree,
    width,
    docId,
    setDocId
}: {
    menuTree: Array<any>,
    width: number,
    docId: string
    setDocId: Function
}) {
    return (
        <Box width={width} height={"calc(100vh - 96px)"} mr={3} overflow={"auto"}>
            <RichTreeView items={menuTree} selectedItems={docId} onItemClick={(event, docId) => { if (docId.lastIndexOf(".md") === docId.length - 3) setDocId(docId) }} />
        </Box>
    );
}

import { menuTreeObj } from "@/app/lib/server/docLoader";
import { Drawer, Toolbar } from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";

export default function MenuTree({
    menuTree,
    width,
    docId,
    setDocId
}: {
    menuTree: Array<menuTreeObj>
    width: number,
    docId: string
    setDocId: (value: string) => void
}) {
    return (
        <Drawer variant="permanent" sx={{ width: width, zIndex: (theme) => theme.zIndex.appBar - 1 }} PaperProps={{ sx: { width: width, p: 2 } }}>
            <Toolbar />
            <RichTreeView items={menuTree} selectedItems={docId} sx={{ overflow: "hidden", textOverflow: "ellipsis" }} onItemClick={(event, docId) => { if (docId.lastIndexOf(".md") === docId.length - 3) setDocId(docId) }} />
        </Drawer>
    );
}

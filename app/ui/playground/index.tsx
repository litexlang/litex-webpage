import { Box, Grid2 } from "@mui/material";
import ActionBar from "./ActionBar";
import { useRef, useState } from "react";
import CodeEditor from "./CodeEditor";
import Output from "./OutPut";

export default function Playground({ height, initCode }: { height: string | number, initCode: string }) {

    const editorRef = useRef(null);

    // state vars
    const [code, setCode] = useState(initCode)
    const [output, setOutput] = useState(["LiTeX 0.0.1", "More information about LiTeX is available at <https://github.com/litexlang/tslitex>"])

    return (
        <Box border={2} borderRadius={2} px={1} my={2}>
            <Grid2 container columnSpacing={1}>
                <Grid2 size={6}>
                    <ActionBar code={code} editorRef={editorRef} setOutput={setOutput} />
                    <CodeEditor code={code} setCode={setCode} editorRef={editorRef} height={height} />
                </Grid2>
                <Grid2 size={6}>
                    <Output output={output} height={height} />
                </Grid2>
            </Grid2>
        </Box>
    );
}
import { Box, Grid2 } from "@mui/material";
import ActionBar from "./ActionBar";
import { useEffect, useRef, useState } from "react";
import CodeEditor from "./CodeEditor";
import Output from "./OutPut";

export default function Playground({ height, demoPath, initCode }: { height: string | number, demoPath?: string | undefined, initCode?: string | undefined }) {

    const editorRef = useRef(null);

    // state vars
    const [code, setCode] = useState("")
    const [output, setOutput] = useState(["Loading..."]);

    const codeInit = () => {
        if (initCode) {
            setCode(initCode);
        } else if (demoPath) {
            fetch("/api/code?" + new URLSearchParams({ demoPath })).then((resp) => {
                if (resp.status === 200) {
                    resp.json().then((json) => {
                        setCode(json.data);
                    });
                }
            });
        }
    }

    const outputInit = () => {
        fetch("/api/litex-version").then((resp) => {
            if (resp.status === 200) {
                resp.json().then((json) => {
                    setOutput(["Litex " + json.data, "More information about Litex is available at <https://github.com/litexlang/golitex>"]);
                });
            }
        });
    }

    useEffect(() => {
        codeInit()
        outputInit()
    }, [demoPath, initCode]);

    return (
        <Box border={2} borderRadius={2} px={1} py={0.5}>
            <Grid2 container columnSpacing={1}>
                <Grid2 size={12}>
                    <ActionBar code={code} editorRef={editorRef} setOutput={setOutput} />
                </Grid2>
                <Grid2 size={6}>
                    <CodeEditor code={code} setCode={setCode} editorRef={editorRef} height={height} />
                </Grid2>
                <Grid2 size={6}>
                    <Output output={output} height={height} />
                </Grid2>
            </Grid2>
        </Box>
    );
}
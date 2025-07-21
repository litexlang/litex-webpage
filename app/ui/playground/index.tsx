import { Box, Grid2 } from "@mui/material";
import ActionBar from "./ActionBar";
import { useEffect, useRef, useState } from "react";
import CodeEditor from "./CodeEditor";
import LitexRunningOutput from "./LitexRunningOutput";
import { TargetFormat } from "@/app/lib/structs/enums";
import LatexRunningOutput from "./LatexRunningOutput";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/browser/store";

export default function Playground({
  height,
  demoPath,
  initCode,
}: {
  height: string | number;
  demoPath?: string | undefined;
  initCode?: string | undefined;
}) {
  // ref vars
  const editorRef = useRef(null);
  const latexEditorRef = useRef(null);

  // redux vars
  const targetFormat = useSelector(
    (state: RootState) => state.targetFormat.value
  );

  // state vars
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("Loading...");

  const codeInit = () => {
    if (initCode) {
      setCode(initCode);
    } else {
      fetch(
        "/api/code?" +
          new URLSearchParams({ demoPath: demoPath || "syllogism" })
      ).then((resp) => {
        if (resp.status === 200) {
          resp.json().then((json) => {
            setCode(json.data);
          });
        }
      });
    }
  };

  const outputInit = () => {
    if (targetFormat === TargetFormat.Output) {
      fetch("/api/litex-version").then((resp) => {
        if (resp.status === 200) {
          resp.json().then((json) => {
            setOutput(
              "Litex " +
                json.data +
                (targetFormat === TargetFormat.Output ? "\n\n" : "\n") +
                "More information about Litex is available at https://github.com/litexlang/golitex"
            );
          });
        }
      });
    } else {
      setOutput("");
    }
  };

  useEffect(() => {
    codeInit();
    outputInit();
  }, [demoPath, initCode, targetFormat]);

  return (
    <Box border={2} borderRadius={2} px={1} py={0.5}>
      <Grid2 container columnSpacing={1}>
        <Grid2 size={12}>
          <ActionBar code={code} setOutput={setOutput} />
        </Grid2>
        <Grid2 size={6}>
          <CodeEditor
            code={code}
            setCode={setCode}
            editorRef={editorRef}
            height={height}
          />
        </Grid2>
        <Grid2 size={6}>
          {targetFormat === TargetFormat.Output ? (
            <LitexRunningOutput litexRunningResult={output} height={height} />
          ) : (
            <LatexRunningOutput
              latexContent={output}
              latexEditorRef={latexEditorRef}
              height={height}
            />
          )}
        </Grid2>
      </Grid2>
    </Box>
  );
}

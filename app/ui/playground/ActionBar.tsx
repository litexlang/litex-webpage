import { Box, IconButton, Tooltip } from "@mui/material";
import { PlayArrow, PlaylistPlay } from "@mui/icons-material";
import { L_InteractWithFrontend } from "@/app/lib/browser/tslitex/L_Frontend";
import { MutableRefObject } from "react";
import { editor } from "monaco-editor";
import { L_Env } from "@/app/lib/browser/tslitex/L_Env";

// TODO
export default function ActionBar({
  code,
  editorRef,
  setOutput
}: {
  code: string;
  editorRef:
  | MutableRefObject<editor.IStandaloneCodeEditor>
  | MutableRefObject<null>;
  setOutput: (value: string[]) => void
}) {
  const getSelectionValue = () => {
    if (editorRef.current) {
      return editorRef.current
        .getModel()!
        .getValueInRange(editorRef.current.getSelection()!);
    } else {
      return "";
    }
  };

  const analyseCode = (inputCode: string) => {
    const runResult = L_InteractWithFrontend(new L_Env(), inputCode);
    setOutput(runResult.messages)
  };

  const executeSelectedCode = () => {
    analyseCode(getSelectionValue());
  };

  const executeCode = () => {
    analyseCode(code);
  };

  return (
    <Box display={"flex"}>
      <Tooltip arrow title={"execute all code"}>
        <IconButton
          size="small"
          onClick={() => {
            executeCode();
          }}
        >
          <PlayArrow fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Tooltip arrow title={"execute selected code"}>
        <IconButton
          size="small"
          onClick={() => {
            executeSelectedCode();
          }}
        >
          <PlaylistPlay fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
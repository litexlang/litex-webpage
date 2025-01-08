import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { PlayArrow, PlaylistPlay } from "@mui/icons-material";
import { L_InteractWithFrontend } from "@/app/lib/tslitex/L_Frontend";
import { useDispatch } from "react-redux";
import { modifyOutput } from "@/app/lib/store/slices/outputSlice";
import { MutableRefObject } from "react";
import { editor } from "monaco-editor";
import { modifyEnv } from "@/app/lib/store/slices/envSlice";
import { L_Env } from "@/app/lib/tslitex/L_Env";

export default function ActionBar({
  code,
  editorRef,
}: {
  code: string;
  editorRef:
  | MutableRefObject<editor.IStandaloneCodeEditor>
  | MutableRefObject<null>;
}) {
  // redux vars
  const dispatch = useDispatch();

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
    console.log(runResult);
    
    dispatch(modifyOutput(runResult.messages));
    dispatch(modifyEnv(runResult.env));
  };

  const executeSelectedCode = () => {
    analyseCode(getSelectionValue());
  };

  const executeCode = () => {
    analyseCode(code);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Typography variant="subtitle2" sx={{ flex: 1 }}>Code Space</Typography>
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
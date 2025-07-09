import { Box, IconButton, Tooltip } from "@mui/material";
import { PlayArrow, PlaylistPlay } from "@mui/icons-material";
import { MutableRefObject } from "react";
import { editor } from "monaco-editor";

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
    fetch("/api/litex", {
      method: "POST",
      body: JSON.stringify({ "litexString": inputCode }),
    }).then((resp) => {
      if (resp.status === 200) {
        resp.json().then((json) => {
          setOutput(json.data);
        });
      } else {
        setOutput(["[Server Error] Try later..."])
      }
    }).catch(() => {
      setOutput(["[Network Error] Try later..."])
    });
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
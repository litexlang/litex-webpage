import { Box, IconButton, Tooltip } from "@mui/material";
import { PlayArrow, PlaylistPlay } from "@mui/icons-material";
import { L_runFrontend } from "@/app/lib/tslitex/L_Frontend";
import { useDispatch } from "react-redux";
import { modifyOutput } from "@/app/lib/store/slices/outputSlice";

export default function ActionBar({ code, editorRef }) {
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
    dispatch(modifyOutput(L_runFrontend(inputCode)));
  };

  const executeSelectedCode = () => {
    analyseCode(getSelectionValue());
  };

  const executeCode = () => {
    analyseCode(code);
  };

  return (
    <Box>
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

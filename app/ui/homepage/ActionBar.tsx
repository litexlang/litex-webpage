import { Box, IconButton, Tooltip } from "@mui/material";
import { PlayArrow, PlaylistPlay } from "@mui/icons-material";

export default function ActionBar({ code, editorRef }) {
  const getSelectionValue = () => {
    if (editorRef.current) {
      return editorRef.current
        .getModel()!
        .getValueInRange(editorRef.current.getSelection()!);
    } else {
      return "";
    }
  };

  // TODO finish function
  const analyseCode = (inputCode: string) => {
    // const resultList = analyse(inputCode);
  };

  const executeSelectedCode = () => {
    analyseCode(getSelectionValue());
  };

  const executeCode = () => {
    analyseCode(code);
  };

  return (
    <Box>
      <Tooltip arrow title={"execute selected code"}>
        <IconButton
          size="small"
          onClick={() => {
            executeSelectedCode();
          }}
        >
          <PlayArrow fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Tooltip arrow title={"execute all code"}>
        <IconButton
          size="small"
          onClick={() => {
            executeCode();
          }}
        >
          <PlaylistPlay fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

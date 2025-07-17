import {
  Box,
  IconButton,
  IconButtonProps,
  styled,
  Tab,
  TabProps,
  Tabs,
  TabsProps,
  Tooltip,
} from "@mui/material";
import { PlayArrow, PlaylistPlay } from "@mui/icons-material";
import { MutableRefObject, useEffect } from "react";
import { editor } from "monaco-editor";
import { TargetFormat } from "@/app/lib/structs/enums";
import { useDispatch, useSelector } from "react-redux";
import { setTargetFormat } from "@/app/lib/browser/store/slices/targetFormatSlice";
import { RootState } from "@/app/lib/browser/store";

// TODO
export default function ActionBar({
  code,
  editorRef,
  setOutput,
}: {
  code: string;
  editorRef:
    | MutableRefObject<editor.IStandaloneCodeEditor>
    | MutableRefObject<null>;
  setOutput: (value: string) => void;
}) {
  // style vars
  const ActionBarIconButton = styled(IconButton)<IconButtonProps>(() => ({
    cursor: "pointer",
  }));

  const ActionBarTabs = styled(Tabs)<TabsProps>(() => ({
    minHeight: "28px",
  }));

  const ActionBarTab = styled(Tab)<TabProps>(() => ({
    padding: "0 12px",
    fontSize: "12px",
    textTransform: "none",
    minHeight: "28px",
    minWidth: "0px",
  }));

  // redux vars
  const dispatch = useDispatch();
  const targetFormat = useSelector(
    (state: RootState) => state.targetFormat.value
  );

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
      body: JSON.stringify({ targetFormat, litexString: inputCode }),
    })
      .then((resp) => {
        if (resp.status === 200) {
          resp.json().then((json) => {
            setOutput(json.data);
          });
        } else {
          setOutput("[Server Error] Try later...");
        }
      })
      .catch(() => {
        setOutput("[Network Error] Try later...");
      });
  };

  const executeSelectedCode = () => {
    setOutput("Loading...");
    analyseCode(getSelectionValue());
  };

  const executeCode = () => {
    setOutput("Loading...");
    analyseCode(code);
  };

  useEffect(() => {
    if (code) executeCode();
  }, [targetFormat]);

  return (
    <Box display={"flex"}>
      <Tooltip arrow title={"Run all code"}>
        <ActionBarIconButton
          size="small"
          onClick={() => {
            executeCode();
          }}
        >
          <PlayArrow fontSize="inherit" />
        </ActionBarIconButton>
      </Tooltip>
      <Tooltip arrow title={"Run selected code"}>
        <ActionBarIconButton
          size="small"
          onClick={() => {
            executeSelectedCode();
          }}
        >
          <PlaylistPlay fontSize="inherit" />
        </ActionBarIconButton>
      </Tooltip>
      <Box flex={1} />
      <ActionBarTabs
        value={targetFormat}
        onChange={(event, value) => {
          dispatch(setTargetFormat(value));
        }}
      >
        <ActionBarTab label={TargetFormat.Output} value={TargetFormat.Output} />
        <ActionBarTab label={TargetFormat.Latex} value={TargetFormat.Latex} />
      </ActionBarTabs>
    </Box>
  );
}

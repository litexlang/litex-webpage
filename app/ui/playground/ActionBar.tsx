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
import {
  ContentPaste,
  CopyAll,
  Copyright,
  Done,
  Inventory,
  PlayArrow,
  PlaylistPlay,
} from "@mui/icons-material";
import { MutableRefObject, useState } from "react";
import { editor } from "monaco-editor";
import { TargetFormat } from "@/app/lib/structs/enums";
import { useDispatch, useSelector } from "react-redux";
import { setTargetFormat } from "@/app/lib/browser/store/slices/targetFormatSlice";
import { RootState } from "@/app/lib/browser/store";
import { clipboardObj } from "@/app/lib/structs/interfaces";

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

  // state vars
  const [clipboard, setClipboard] = useState<clipboardObj>({
    value: "",
    copied: false,
  });

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
            setClipboard({ value: json.data, copied: false });
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
    setClipboard({ value: "", copied: false });
    analyseCode(getSelectionValue());
  };

  const executeCode = () => {
    setOutput("Loading...");
    setClipboard({ value: "", copied: false });
    analyseCode(code);
  };

  const copyLatexToClipboard = () => {
    if (clipboard.value) {
      navigator.clipboard.writeText(clipboard.value);
      setClipboard({ ...clipboard, copied: true });
      setTimeout(() => {
        setClipboard({ ...clipboard, copied: false });
      }, 2000);
    }
  };

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
      {targetFormat === TargetFormat.Latex && (
        <Tooltip
          arrow
          title={clipboard.copied ? "Copied" : "Copy LaTeX text to clipboard"}
        >
          <ActionBarIconButton
            disabled={!clipboard.value}
            size="small"
            onClick={() => {
              copyLatexToClipboard();
            }}
          >
            {clipboard.copied ? (
              <Done fontSize="inherit" />
            ) : (
              <ContentPaste fontSize="inherit" />
            )}
          </ActionBarIconButton>
        </Tooltip>
      )}
    </Box>
  );
}

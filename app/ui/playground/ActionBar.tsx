import {
  Box,
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
  styled,
  Tab,
  TabProps,
  Tabs,
  TabsProps,
  Tooltip,
} from "@mui/material";
import { ContentPaste, Done, PlayArrow } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { TargetFormat } from "@/app/lib/structs/enums";
import { useDispatch, useSelector } from "react-redux";
import { setTargetFormat } from "@/app/lib/browser/store/slices/targetFormatSlice";
import { RootState } from "@/app/lib/browser/store";
import { clipboardPrepObj } from "@/app/lib/structs/interfaces";

export default function ActionBar({
  code,
  setOutput,
}: {
  code: string;
  setOutput: (value: string) => void;
}) {
  // style vars
  const ActionBarButton = styled(Button)<ButtonProps>(() => ({
    padding: 0,
  }));

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
  const [clipboardPrep, setClipboardPrep] = useState<clipboardPrepObj>({
    value: "",
    copied: false,
  });

  const resetClipboardPrep = () => {
    setClipboardPrep({
      value: "",
      copied: false,
    });
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
            setClipboardPrep({ value: json.data, copied: false });
          });
        } else {
          setOutput("[Server Error] Try later...");
        }
      })
      .catch(() => {
        setOutput("[Network Error] Try later...");
      });
  };

  const executeCode = () => {
    setOutput("Loading...");
    analyseCode(code);
  };

  const copyLatexToClipboard = () => {
    if (clipboardPrep.value) {
      navigator.clipboard.writeText(clipboardPrep.value);
      setClipboardPrep({ ...clipboardPrep, copied: true });
      setTimeout(() => {
        setClipboardPrep({ ...clipboardPrep, copied: false });
      }, 2000);
    }
  };

  useEffect(() => {
    resetClipboardPrep();
  }, [targetFormat]);

  return (
    <Box display={"flex"}>
      <ActionBarButton
        size="small"
        startIcon={<PlayArrow />}
        onClick={() => {
          executeCode();
        }}
      >
        Run
      </ActionBarButton>
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
          title={
            clipboardPrep.copied ? "Copied" : "Copy LaTeX text to clipboard"
          }
        >
          <ActionBarIconButton
            disabled={!clipboardPrep.value}
            size="small"
            onClick={() => {
              copyLatexToClipboard();
            }}
          >
            {clipboardPrep.copied ? (
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

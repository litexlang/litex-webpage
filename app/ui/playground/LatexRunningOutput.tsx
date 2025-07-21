import { Box } from "@mui/material";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
import { Editor } from "@monaco-editor/react";
import { MutableRefObject } from "react";
import { editor } from "monaco-editor";

export default function LatexRunningOutput({
  latexContent,
  latexEditorRef,
  height,
}: {
  latexContent: string;
  latexEditorRef:
    | MutableRefObject<editor.IStandaloneCodeEditor>
    | MutableRefObject<null>;
  height: string | number;
}) {
  const handleLatexEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    latexEditorRef.current = editor;
  };

  return (
    <Editor
      height={height}
      value={latexContent}
      onMount={handleLatexEditorDidMount}
    />
  );
}

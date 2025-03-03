import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import React, { MutableRefObject } from "react";

export default function CodeEditor({
  code,
  setCode,
  editorRef,
  height
}: {
  code: string;
  setCode: (value: string) => void;
  editorRef:
  | MutableRefObject<editor.IStandaloneCodeEditor>
  | MutableRefObject<null>;
  height: string | number
}) {
  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  return (
    <Editor
      height={height}
      value={code}
      onChange={(value) => {
        if (value) {
          setCode(value);
        } else {
          setCode("");
        }
      }}
      onMount={handleEditorDidMount}
    />
  );
}

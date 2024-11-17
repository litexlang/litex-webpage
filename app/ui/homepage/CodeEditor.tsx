import { Editor, Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";

export default function CodeEditor({ code, setCode, editorRef }) {
  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    _monacoInstance: Monaco
  ) => {
    editorRef.current = editor;
  };

  return (
    <Editor
      height={"calc(100vh - 88px)"}
      value={code}
      onChange={(value) => {
        setCode(value);
      }}
      onMount={handleEditorDidMount}
    />
  );
}

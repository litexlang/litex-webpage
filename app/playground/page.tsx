"use client";

import { Container, Grid2, Toolbar, Typography } from "@mui/material";
import ActionBar from "../ui/playground/ActionBar";
import { useRef } from "react";
import CodeEditor from "../ui/playground/CodeEditor";
import { useAppDispatch, useAppSelector } from "../lib/store/hooks";
import { modifyCode } from "../lib/store/slices/codeSlice";
import Output from "../ui/playground/OutPut";
import EnvWatcher from "../ui/playground/EnvWatcher";

export default function Home() {
  const editorRef = useRef(null);

  // redux vars
  const code = useAppSelector((state) => state.code.value);
  const dispatch = useAppDispatch();

  const setCode = (value: string) => {
    dispatch(modifyCode(value));
  };

  return (
    <Container component={"main"} sx={{ p: 2 }} maxWidth={false}>
      <Toolbar />
      <Grid2 container columnSpacing={1}>
        <Grid2 size={2}>
          <EnvWatcher />
        </Grid2>
        <Grid2 size={5}>
          <ActionBar code={code} editorRef={editorRef} />
          <CodeEditor code={code} setCode={setCode} editorRef={editorRef} />
        </Grid2>
        <Grid2 size={5}>
          <Output />
        </Grid2>
      </Grid2>
    </Container>
  );
}

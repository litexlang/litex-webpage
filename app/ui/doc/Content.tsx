import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import Playground from "../playground";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Content({ docPath }: { docPath: string }) {
  // state vars
  const [content, setContent] = useState<string>("loading...");

  const contentInit = () => {
    if (docPath) {
      fetch("/api/content?" + new URLSearchParams({ docPath })).then((resp) => {
        if (resp.status === 200) {
          resp.json().then((json) => {
            setContent(json.data);
          });
        }
      });
    }
  };

  useEffect(() => {
    contentInit();
  }, [docPath]);

  return (
    <Container maxWidth={"xl"}>
      <Markdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        children={content}
        components={{
          code({ children, className, ...rest }) {
            const matchLitex = /language-litex/.exec(className || "");
            const matchCodeBlock = /language-(\w+)/.exec(className || "");
            return matchLitex ? (
              <Playground height={300} initCode={String(children)} />
            ) : matchCodeBlock ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                language={matchCodeBlock[1]}
                style={dark}
                customStyle={{ borderRadius: 8 }}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      />
    </Container>
  );
}

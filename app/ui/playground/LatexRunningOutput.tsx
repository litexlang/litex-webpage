import { Box } from "@mui/material";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";

export default function LatexRunningOutput({
  latexContent,
  height,
}: {
  latexContent: string;
  height: string | number;
}) {
  const latexContentTransformer: (str: string) => string[] = (str) => {
    return str
      .split("\n")
      .filter(
        (line: string) => line.trim() !== "" && line.trim().indexOf("\\") !== 0
      )
      .map((line: string) => line.trim());
  };

  return (
    <Box height={height} overflow={"auto"} p={1}>
      {latexContentTransformer(latexContent).map((line, index) => (
        <Box key={index} mb={2} fontFamily={"tgbonum"}>
          <Latex>{line}</Latex>
        </Box>
      ))}
    </Box>
  );
}

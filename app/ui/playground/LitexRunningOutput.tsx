import { Box, Typography } from "@mui/material";
import { green, grey, red } from "@mui/material/colors";

export default function LitexRunningResult({
  litexRunningResult,
  height,
}: {
  litexRunningResult: string;
  height: string | number;
}) {
  const litexRunningResultTransformer: (str: string) => string[] = (str) => {
    return str
      .split("\n\n")
      .filter((line: string) => line.trim() !== "")
      .map((line: string) => line.trim());
  };

  return (
    <Box height={height} overflow={"auto"} p={1}>
      {litexRunningResultTransformer(litexRunningResult).map((item, index) => (
        <Box
          key={index}
          sx={
            item.indexOf("Success") >= 0
              ? { bgcolor: green[300], mb: 1, borderRadius: 1, p: 1 }
              : item.indexOf("Error") >= 0
              ? { bgcolor: red[300], mb: 1, borderRadius: 1, p: 1 }
              : { bgcolor: grey[300], mb: 1, borderRadius: 1, p: 1 }
          }
        >
          <Typography variant="body2" whiteSpace={"pre-line"}>
            {item}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

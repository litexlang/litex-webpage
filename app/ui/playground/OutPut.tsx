import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function Output({ output, height }: { output: string[], height: string | number }) {

  return (
    <Box>
      <Typography variant="subtitle2" lineHeight={"32px"}>Output</Typography>
      <Box height={height} overflow={"auto"} p={1}>
        {output.map((item, index) => (
          <Box
            key={index}
            sx={{ bgcolor: grey[300], mb: 1, borderRadius: 1, p: 1 }}
          >
            <Typography variant="body2">
              {item}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

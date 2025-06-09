import { Box, Typography } from "@mui/material";
import { green, grey, red } from "@mui/material/colors";

export default function Output({ output, height }: { output: string[], height: string | number }) {

  return (
    <Box>
      <Box height={height} overflow={"auto"} p={1}>
        {output.map((item, index) => (
          <Box
            key={index}
            sx={item.indexOf("Success") >= 0 ? { bgcolor: green[300], mb: 1, borderRadius: 1, p: 1 } : item.indexOf("Error") >= 0 ? { bgcolor: red[300], mb: 1, borderRadius: 1, p: 1 } : { bgcolor: grey[300], mb: 1, borderRadius: 1, p: 1 }}
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

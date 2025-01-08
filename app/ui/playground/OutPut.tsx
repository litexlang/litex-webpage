import { useAppSelector } from "@/app/lib/store/hooks";
import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function Output() {
  // redux vars
  const output = useAppSelector((state) => state.output.value);

  return (
    <Box>
      <Typography variant="subtitle2" height={"32px"}>Output</Typography>
      <Box height={"calc(100vh - 120px)"} overflow={"auto"}>
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

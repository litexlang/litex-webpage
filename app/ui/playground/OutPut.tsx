import { useAppSelector } from "@/app/lib/store/hooks";
import { Box, Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";

export default function Output() {
  // redux vars
  const output = useAppSelector((state) => state.output.value);

  return (
    <Box>
      <Typography variant="subtitle2">Output</Typography>
      {output.map((item, index) => (
        <Box
          key={index}
          sx={{ bgcolor: grey[300], mb: 1, borderRadius: 1, p: 1 }}
        >
          {item.map((o, i) => (
            <Typography key={i} variant="body2">
              {o}
            </Typography>
          ))}
        </Box>
      ))}
    </Box>
  );
}

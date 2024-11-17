import { useAppSelector } from "@/app/lib/store/hooks";
import { Box, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

export default function Output() {
  // redux vars
  const output = useAppSelector((state) => state.output.value);

  return (
    <Box>
      {output.map((item) => (
        <Box sx={{ bgcolor: red[100], mb: 1 }}>
          {item.map((o) => (
            <Typography variant="body2" sx={{ mb: 1 }}>
              {o}
            </Typography>
          ))}
        </Box>
      ))}
    </Box>
  );
}

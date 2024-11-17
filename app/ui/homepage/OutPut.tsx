import { useAppSelector } from "@/app/lib/store/hooks";
import { Box, Toolbar, Typography } from "@mui/material";

export default function Output() {
  // redux vars
  const output = useAppSelector((state) => state.output.value);

  return (
    <Box>
      {output.map((o) => (
        <Typography variant="body2">{o}</Typography>
      ))}
    </Box>
  );
}

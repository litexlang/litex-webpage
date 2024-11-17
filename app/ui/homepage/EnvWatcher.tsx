import { useAppSelector } from "@/app/lib/store/hooks";
import { Box, List } from "@mui/material";

export default function EnvWatcher() {
  // redux vars
  const env = useAppSelector((state) => state.env.value);

  return <List>{env && <Box></Box>}</List>;
}

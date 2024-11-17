import { useAppSelector } from "@/app/lib/store/hooks";
import { List } from "@mui/material";

export default function EnvWatcher() {
  // redux vars
  const env = useAppSelector((state) => state.env.value);

  return <List></List>;
}

import { readFileSync } from "fs";
import { menuTreeLoader } from "./menuTreeLoader";

export function docRouteLoader() {
  return menuTreeLoader(process.env.DOC_DIR, "doc").filter(
    (item) => item.path !== "/doc/homepage"
  );
}

export function docReader(path: string) {
  return readFileSync(path, { encoding: "utf-8" });
}

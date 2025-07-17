import { existsSync, readdirSync, readFileSync } from "fs";
import { menuTreeObj } from "../structs/interfaces";

const OrderFile = ".order";

export function menuTreeLoader(
  path: string,
  type: "doc" | "demo",
  menuTree: Array<menuTreeObj> = []
) {
  const direntList = readdirSync(path, { withFileTypes: true });
  const order = existsSync(path + OrderFile)
    ? readFileSync(path + OrderFile, { encoding: "utf-8" })
        .split("\n")
        .filter((file) => file.trim() !== "")
    : [];
  const pathReplacedString =
    type === "doc" ? process.env.DOC_DIR : process.env.DEMO_DIR;
  const pathReplacingString = type === "doc" ? "/doc" : "/playground";
  const titleReplacedString = type === "doc" ? ".md" : ".lix";
  direntList.forEach((dirent) => {
    const fullpath = dirent.path + "/" + dirent.name;
    if (dirent.isDirectory()) {
      menuTree.push({
        title: dirent.name.replaceAll("_", " "),
        path: fullpath.replace(pathReplacedString, pathReplacingString) + "/",
        children: menuTreeLoader(fullpath, type),
      });
    } else if (dirent.name !== ".order") {
      menuTree.push({
        title: dirent.name
          .replace(titleReplacedString, "")
          .replaceAll("_", " "),
        path: fullpath
          .replace(pathReplacedString, pathReplacingString)
          .replace(titleReplacedString, ""),
      });
    }
  });
  return menuTree.sort(
    (a: menuTreeObj, b: menuTreeObj) =>
      getPriorityFromOrder(b, order) - getPriorityFromOrder(a, order)
  );
}

function getPriorityFromOrder(item: menuTreeObj, order: string[]): number {
  const index = order.findIndex(
    (orderItem) => orderItem.replaceAll("_", " ") === item.title
  );
  return index > -1 ? order.length - index : index;
}

import { readdirSync } from "fs";

export interface menuTreeObj {
    path: string, title: string, children?: Array<menuTreeObj>
}

export function menuTreeLoader(path: string, type: "doc" | "demo", menuTree: Array<menuTreeObj> = []) {
    const direntList = readdirSync(path, { withFileTypes: true })
    const pathReplacedString = type === "doc" ? process.env.DOC_DIR : process.env.DEMO_DIR;
    const pathReplacingString = type === "doc" ? "/doc" : "/playground";
    const titleReplacedString = type === "doc" ? ".md" : ".lix";
    direntList.forEach((dirent) => {
        const fullpath = dirent.path + '/' + dirent.name
        if (dirent.isDirectory()) {
            menuTree.push({ title: dirent.name.replaceAll("_", " "), path: fullpath.replace(pathReplacedString, pathReplacingString), children: menuTreeLoader(fullpath, type) })
        } else {
            menuTree.push({ title: dirent.name.replace(titleReplacedString, "").replaceAll("_", " "), path: fullpath.replace(pathReplacedString, pathReplacingString).replace(titleReplacedString, "") })
        }
    })
    return menuTree;
}
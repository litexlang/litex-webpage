import { readdirSync, readFileSync } from "fs";

export interface menuTreeObj {
    id: string, label: string, children?: Array<menuTreeObj>
}

export function docRouteLoader() {
    const direntList = readdirSync(process.env.DOC_DIR, { withFileTypes: true })
    const docRouteList: Array<{ title: string, path: string }> = []
    direntList.forEach((dirent) => {
        if (dirent.isDirectory()) {
            docRouteList.push({ title: dirent.name.replace(".md", ""), path: "/doc/" + dirent.name.replace(".md", "") })
        }
    })
    return docRouteList;
}

export function menuTreeLoader(path: string, menuTree: Array<menuTreeObj> = []) {
    const direntList = readdirSync(path, { withFileTypes: true })
    direntList.forEach((dirent) => {
        const fullpath = dirent.path + '/' + dirent.name
        if (dirent.isDirectory()) {
            menuTree.push({ id: fullpath.replace(process.env.DOC_DIR, ""), label: dirent.name, children: menuTreeLoader(fullpath) })
        } else {
            menuTree.push({ id: fullpath.replace(process.env.DOC_DIR, ""), label: dirent.name })
        }
    })
    return menuTree;
}

export function docReader(path: string) {
    return readFileSync(path, { encoding: 'utf-8' });
}
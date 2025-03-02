import { readdirSync, readFileSync } from "fs";

export function docRouteLoader() {
    const direntList = readdirSync(process.env.DOC_DIR, { withFileTypes: true })
    let docRouteList: Array<any> = []
    direntList.forEach((dirent) => {
        docRouteList.push({ title: dirent.name.replace(".md", ""), path: "/doc/" + dirent.name.replace(".md", "") })
    })
    return docRouteList;
}

export function menuTreeLoader(path: string, menuTree: Array<any> = []) {
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
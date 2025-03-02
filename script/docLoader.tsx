import { readdirSync, readFileSync } from "fs";

export function rootDirLoader() {
    return readdirSync(process.env.DOC_DIR, { withFileTypes: true });
}

export function menuTreeLoader(path: string, menuTree: Array<any> = []) {
    console.log(path);
    const direntList = readdirSync(path, { withFileTypes: true })
    direntList.forEach((dirent) => {
        const fullpath = dirent.path + '/' + dirent.name
        if (dirent.isDirectory()) {
            menuTree.push({ id: fullpath, label: dirent.name, children: menuTreeLoader(fullpath) })
        } else {
            menuTree.push({ id: fullpath, label: dirent.name })
        }
    })
    return menuTree;
}

export function docReader(path: string) {
    return readFileSync(path, { encoding: 'utf-8' });
}
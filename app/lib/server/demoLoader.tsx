import { readFileSync } from "fs";
import { menuTreeLoader } from "./menuTreeLoader";

export function demoRouteLoader() {
    return { title: "Playground", path: "/playground/", children: menuTreeLoader(process.env.DEMO_DIR, "demo") };
}

export function demoReader(path: string) {
    return readFileSync(path, { encoding: 'utf-8' });
}
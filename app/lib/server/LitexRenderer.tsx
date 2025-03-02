import { Renderer } from '@ts-stack/markdown'

export default class LitexRenderer extends Renderer {
    override code(code: string, lang?: string, escaped?: boolean, meta?: string): string {
        return ""
    }
}
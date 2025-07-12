import type MarkdownIt from "markdown-it";
import type { PluginSimple } from "markdown-it"
import { load } from "js-yaml";
import type { RuleBlock } from "markdown-it/lib/parser_block.mjs";
import type { StateBlock } from "markdown-it/index.js";

const METABLOCK = /^---$/;

const plugin: PluginSimple = (md: MarkdownIt) => {
    md.renderer.rules.metadata = (_tokens, _idx) => "<br/>";
    md.block.ruler.before('code', "meta", metadata_parser, { alt: [] });
}

export default plugin;

function get(state: StateBlock, line: number) {
    const ps = state.bMarks[line];
    const max = state.eMarks[line];
    return state.src.substring(ps, max);
}

const loadYAML = (data: string[]) => {
    const yaml = data.join("\n");
    try {
        const content = load(yaml, { json: true });
        return [content, null];
    } catch (error) {
        return [null, error];
    }
}

const metadata_parser: RuleBlock = (state, start, end) => {
    if (start !== 0 || state.blkIndent !== 0) return false;
    if (state.tShift[start] < 0) return false;

    const hasStart = get(state, start);
    if (!hasStart.match(METABLOCK)) return false;

    const data = [];
    let line = start;
    while (line < end) {
        line++;
        const str = get(state, line);
        if (str.match(METABLOCK)) break;
        if (state.tShift[line] < 0) break;
        data.push(str);
    }

    state.line = line + 1;

    const [yaml] = loadYAML(data);

    const token = state.push("metadata", "code", 0);
    token.attrs = Object.entries(yaml ?? {});

    return true;
}
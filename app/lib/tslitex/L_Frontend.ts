import { L_Scan } from "./L_Lexer.ts";
import * as L_Executor from "./L_Executor.ts";
import * as L_Parser from "./L_Parser.ts";
import { L_Env } from "./L_Env.ts";

export function L_runFrontend(code: string) {
  const env = new L_Env(undefined);
  return {
    result: runFrontendString(env, code),
    env: JSON.parse(JSON.stringify(env.toJSON())),
  };
}

export function runFrontendString(env: L_Env, expr: string): string[][] {
  try {
    const tokens = L_Scan(expr);
    const nodes = L_Parser.parseUntilGivenEnd(env, tokens, null);
    if (nodes === undefined) {
      throw Error();
    }
    const result: string[][] = [];
    for (const node of nodes) {
      L_Executor.nodeExec(env, node);
      result.push(env.returnClearMessage());
    }
    return result;
  } catch {
    return [["error!"]];
  }
}

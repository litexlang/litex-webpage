import { ExampleItem } from "./L_Structs";
import { L_Env } from "./L_Env";
import { parseNodes } from "./L_Parser";
import { L_Tokens } from "./L_Lexer";

export const exampleList: ExampleItem[] = [
  {
    name: "define subset",
    code: [
      "def set(x);",
      "let x;",
      "know set(x);",
      "set(x)[x,y];",
      "set (\\frac{1,2})[\\frac{3,4}, \\frac{5,6}] ;",
      "if x, \\frac{a,b}[a,b] : set(x) {set(x)};",
    ],
    debug: false,
  },
  {
    name: "def_composite",
    code: [
      "def_composite \\frac{x,y} : number(x), number(y);",
      "know if x, a, b: in(x, \\pair{a,b}) { if :  not equal(x, b) {equal(x, a)} , if : not equal(x, a) {equal(x, b)} } ;",
      `
      let a ; // ha
      let b;
      `,
    ],
    debug: false,
  },
  {
    name: "comment",
    code: [
      `
      let a ; // ha
      let b;
      `,
    ],
    debug: false,
  },
  {
    name: "opt",
    code: [
      `
let EMPTY_SET: set(EMPTY_SET);

know if x {
    not in(x,EMPTY_SET),
};

{
    let x : not in(x, EMPTY_SET);
    if _x {
        not in(_x,EMPTY_SET)[_x];
    };
}
`,
    ],
    debug: false,
  },
  {
    name: "bool fact",
    code: [`let x: (p(x) or q(y) and j(z) or t(x));`],
    debug: false,
  },
  {
    name: "()",
    code: [`know if x: x is nat {not =(0, \++{x}) }; if x {p(x)};`],
    debug: false,
  },
  {
    name: "()",
    code: [
      `know if a,b,c: a is nat, b is nat, c is nat, $a + b$ = $a + c$ {$b = c$};`,
    ],
    debug: false,
  },
  {
    name: "if",
    code: [
      `concept $=(x, y); operator \\frac{x,y}; let 1; concept $nat(x);`,
      `if [x(a,b): \\frac{\\frac{a,1}, b}]: $nat(a) {x = \\frac{a, b}};`,
    ],
    debug: false,
  },
];

function runExamples() {
  const env = new L_Env();
  for (const example of exampleList) {
    if (example.debug) {
      console.log(example.name);
      runParserTest(env, example.code, true);
      // if (example.test !== undefined) {
      //   runParserTest(env, example.test, example.print);
      // }
    }
  }
}

function runParserTest(env: L_Env, codes: string[], print: boolean) {
  for (const code of codes) {
    const tokens = new L_Tokens(code);
    const nodes = parseNodes(env, tokens, null);
    for (const node of nodes) {
      if (print) console.log(node);
    }
  }
}

runExamples();

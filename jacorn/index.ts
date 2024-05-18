import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { Program } from "./ast";

interface ParseOptions {
  ecmaVersion?: string;
  sourceType?: "script" | "module";
}

function parse(code: string, options?: ParseOptions): Program {
  // You can handle the options here if needed
  const lexer = new Lexer(code);
  const tokens = lexer.tokenize();

  const parser = new Parser(tokens);
  const ast: Program = parser.parse();

  return ast;
}

export default {
  parse,
};

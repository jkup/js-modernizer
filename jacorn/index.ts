import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { Program } from "./ast";

const code = `
    var x = 42;
`;

const lexer = new Lexer(code);
const tokens = lexer.tokenize();
console.log("Tokens:", tokens);

const parser = new Parser(tokens);
const ast: Program = parser.parse();
console.log("AST:", JSON.stringify(ast, null, 2));

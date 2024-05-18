import { Parser } from "./parser";
import { Lexer } from "./lexer";
import {
  Program,
  VariableDeclaration,
  FunctionDeclaration,
  ReturnStatement,
  BinaryExpression,
  Identifier,
  Literal,
  BlockStatement,
} from "./ast";

const inputCode = `
var x = 1;
var y = 2;
function add(a, b) {
  return a + b;
}
`;

// Expected AST
const expectedAST: Program = {
  type: "Program",
  body: [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          id: { type: "Identifier", name: "x" } as Identifier,
          init: { type: "Literal", value: 1 } as Literal,
        },
      ],
    } as VariableDeclaration,
    {
      type: "VariableDeclaration",
      declarations: [
        {
          id: { type: "Identifier", name: "y" } as Identifier,
          init: { type: "Literal", value: 2 } as Literal,
        },
      ],
    } as VariableDeclaration,
    {
      type: "FunctionDeclaration",
      id: { type: "Identifier", name: "add" } as Identifier,
      params: [
        { type: "Identifier", name: "a" } as Identifier,
        { type: "Identifier", name: "b" } as Identifier,
      ],
      body: {
        type: "BlockStatement",
        body: [
          {
            type: "ReturnStatement",
            argument: {
              type: "BinaryExpression",
              operator: "+",
              left: { type: "Identifier", name: "a" } as Identifier,
              right: { type: "Identifier", name: "b" } as Identifier,
            } as BinaryExpression,
          } as ReturnStatement,
        ],
      } as BlockStatement,
    } as FunctionDeclaration,
  ],
};

// Tokenize and parse the input code
const lexer = new Lexer(inputCode);
const tokens = lexer.tokenize();

const parser = new Parser(tokens);
const outputAST: Program = parser.parse();

// Helper function to deeply compare two objects
function deepEqual(obj1: any, obj2: any): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

// Test the parser output
if (deepEqual(outputAST, expectedAST)) {
  console.log("Test passed!");
} else {
  console.error("Test failed.");
  console.error("Expected:", JSON.stringify(expectedAST, null, 2));
  console.error("Got:", JSON.stringify(outputAST, null, 2));
}

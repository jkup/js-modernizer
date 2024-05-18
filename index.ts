import fs from "fs";
import acorn from "acorn";
import escodegen from "escodegen";
import {
  transformVarToLetOrConst,
  transformFunctionToArrowFunction,
} from "./transform";

const inputFilePath = "input.js";
const inputCode = fs.readFileSync(inputFilePath, "utf-8");

const ast = acorn.parse(inputCode, {
  ecmaVersion: "latest",
  sourceType: "module",
}) as acorn.Node;

// Apply transformations
transformVarToLetOrConst(ast);
transformFunctionToArrowFunction(ast);

// Generate the modernized code
const modernizedCode = escodegen.generate(ast);
console.log(modernizedCode);

// Write the modernized code to a new file
const outputFilePath = "output.js";
fs.writeFileSync(outputFilePath, modernizedCode, "utf-8");
console.log(`Modernized code written to ${outputFilePath}`);

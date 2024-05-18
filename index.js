const fs = require("fs");
const acorn = require("acorn");
const escodegen = require("escodegen");
const { transformVarToLetOrConst } = require("./transform");

const inputFilePath = "input.js";
const inputCode = fs.readFileSync(inputFilePath, "utf-8");

const ast = acorn.parse(inputCode, {
  ecmaVersion: "latest",
  sourceType: "module",
});

// Apply transformations
transformVarToLetOrConst(ast);

// Generate the modernized code
const modernizedCode = escodegen.generate(ast);
console.log(modernizedCode);

// Write the modernized code to a new file
const outputFilePath = "output.js";
fs.writeFileSync(outputFilePath, modernizedCode, "utf-8");
console.log(`Modernized code written to ${outputFilePath}`);

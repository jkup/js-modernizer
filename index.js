const fs = require("fs");
const acorn = require("acorn");

const inputFilePath = "input.js";
const inputCode = fs.readFileSync(inputFilePath, "utf-8");

const ast = acorn.parse(inputCode, {
  ecmaVersion: "latest",
  sourceType: "module",
});

console.log(JSON.stringify(ast, null, 2));

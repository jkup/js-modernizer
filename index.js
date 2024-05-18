"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const acorn_1 = __importDefault(require("acorn"));
const escodegen_1 = __importDefault(require("escodegen"));
const transform_1 = require("./transform");
const inputFilePath = "input.js";
const inputCode = fs_1.default.readFileSync(inputFilePath, "utf-8");
const ast = acorn_1.default.parse(inputCode, {
    ecmaVersion: "latest",
    sourceType: "module",
});
// Apply transformations
(0, transform_1.transformVarToLetOrConst)(ast);
(0, transform_1.transformFunctionToArrowFunction)(ast);
// Generate the modernized code
const modernizedCode = escodegen_1.default.generate(ast);
console.log(modernizedCode);
// Write the modernized code to a new file
const outputFilePath = "output.js";
fs_1.default.writeFileSync(outputFilePath, modernizedCode, "utf-8");
console.log(`Modernized code written to ${outputFilePath}`);

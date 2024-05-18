"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformFunctionToArrowFunction = exports.transformVarToLetOrConst = void 0;
const estraverse_1 = __importDefault(require("estraverse"));
function transformVarToLetOrConst(ast) {
    estraverse_1.default.replace(ast, {
        enter(node) {
            if (node.type === "VariableDeclaration" && node.kind === "var") {
                node.kind = "let"; // For simplicity, we use 'let' here
            }
        },
    });
}
exports.transformVarToLetOrConst = transformVarToLetOrConst;
function transformFunctionToArrowFunction(ast) {
    estraverse_1.default.replace(ast, {
        enter(node) {
            if (node.type === "FunctionDeclaration") {
                const arrowFunctionExpression = {
                    type: "ArrowFunctionExpression",
                    id: null,
                    params: node.params,
                    body: node.body,
                    generator: node.generator,
                    async: node.async,
                    expression: false,
                };
                return {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: node.id,
                            init: arrowFunctionExpression,
                        },
                    ],
                    kind: "const",
                };
            }
        },
    });
}
exports.transformFunctionToArrowFunction = transformFunctionToArrowFunction;

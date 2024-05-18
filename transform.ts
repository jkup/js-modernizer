import estraverse from "estraverse";
import * as acorn from "acorn";

export function transformVarToLetOrConst(ast: acorn.Node): void {
  estraverse.replace(ast, {
    enter(node) {
      if (node.type === "VariableDeclaration" && node.kind === "var") {
        node.kind = "let"; // For simplicity, we use 'let' here
      }
    },
  });
}

export function transformFunctionToArrowFunction(ast: acorn.Node): void {
  estraverse.replace(ast, {
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

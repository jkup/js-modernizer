import estraverse from "estraverse";
import { Node as AcornNode } from "acorn";
import * as estree from "estree";

export function transformVarToLetOrConst(ast: AcornNode): void {
  estraverse.replace(ast as estree.Node, {
    enter(node) {
      if (node.type === "VariableDeclaration" && node.kind === "var") {
        node.kind = "let"; // For simplicity, we use 'let' here
      }
    },
  });
}

export function transformFunctionToArrowFunction(ast: AcornNode): void {
  estraverse.replace(ast as estree.Node, {
    enter(node) {
      if (node.type === "FunctionDeclaration") {
        const arrowFunctionExpression: estree.ArrowFunctionExpression = {
          type: "ArrowFunctionExpression",
          params: node.params,
          body: node.body as estree.BlockStatement,
          generator: node.generator,
          async: node.async,
          expression: false,
        };
        return {
          type: "VariableDeclaration",
          declarations: [
            {
              type: "VariableDeclarator",
              id: node.id as estree.Identifier,
              init: arrowFunctionExpression,
            },
          ],
          kind: "const",
        } as estree.VariableDeclaration;
      }
    },
  });
}

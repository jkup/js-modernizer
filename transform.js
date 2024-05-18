const estraverse = require("estraverse");

function transformVarToLetOrConst(ast) {
  estraverse.replace(ast, {
    enter(node) {
      if (node.type === "VariableDeclaration" && node.kind === "var") {
        node.kind = "let"; // For simplicity, we use 'let' here
      }
    },
  });
}

module.exports = {
  transformVarToLetOrConst,
};

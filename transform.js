const estraverse = require("estraverse");
const escodegen = require("escodegen");

// Traverse and transform the AST
estraverse.replace(ast, {
  enter(node) {
    if (node.type === "VariableDeclaration" && node.kind === "var") {
      node.kind = "let"; // For simplicity, we use 'let' here
    }
  },
});

// Generate the modernized code
const modernizedCode = escodegen.generate(ast);
console.log(modernizedCode);

// Write the modernized code to a new file
const outputFilePath = "output.js";
fs.writeFileSync(outputFilePath, modernizedCode, "utf-8");
console.log(`Modernized code written to ${outputFilePath}`);

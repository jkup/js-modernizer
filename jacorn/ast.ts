export type ASTNode = Program | Expression | Statement;

export interface Program {
  type: "Program";
  body: Statement[];
}

export interface Expression {
  type: string;
}

export interface Statement {
  type: string;
}

// Variable Declaration
export interface VariableDeclaration extends Statement {
  type: "VariableDeclaration";
  declarations: VariableDeclarator[];
}

export interface VariableDeclarator {
  id: Identifier;
  init: Expression | null;
}

// Function Declaration
export interface FunctionDeclaration extends Statement {
  type: "FunctionDeclaration";
  id: Identifier;
  params: Identifier[];
  body: BlockStatement;
}

// Block Statement
export interface BlockStatement extends Statement {
  type: "BlockStatement";
  body: Statement[];
}

// Return Statement
export interface ReturnStatement extends Statement {
  type: "ReturnStatement";
  argument: Expression;
}

// Binary Expression
export interface BinaryExpression extends Expression {
  type: "BinaryExpression";
  operator: string;
  left: Expression;
  right: Expression;
}

// Identifier
export interface Identifier extends Expression {
  type: "Identifier";
  name: string;
}

// Literal
export interface Literal extends Expression {
  type: "Literal";
  value: string | number | boolean | null;
}

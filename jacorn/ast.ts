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

export interface VariableDeclaration extends Statement {
  type: "VariableDeclaration";
  declarations: VariableDeclarator[];
}

export interface VariableDeclarator {
  id: Identifier;
  init: Expression | null;
}

export interface Identifier extends Expression {
  type: "Identifier";
  name: string;
}

export interface Literal extends Expression {
  type: "Literal";
  value: string | number | boolean | null;
}

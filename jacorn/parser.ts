import { Token, TokenType } from "./tokens";
import {
  ASTNode,
  Program,
  VariableDeclaration,
  VariableDeclarator,
  Identifier,
  Literal,
} from "./ast";

export class Parser {
  private tokens: Token[];
  private position: number = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  private peek(): Token {
    return this.tokens[this.position];
  }

  private advance(): Token {
    return this.tokens[this.position++];
  }

  private expect(type: TokenType): Token {
    const token = this.peek();
    if (token.type !== type) {
      throw new Error(`Expected token type ${type}, but got ${token.type}`);
    }
    return this.advance();
  }

  public parse(): Program {
    const program: Program = {
      type: "Program",
      body: [],
    };

    while (this.peek().type !== TokenType.EOF) {
      const stmt = this.parseStatement();
      program.body.push(stmt);
    }

    return program;
  }

  private parseStatement(): ASTNode {
    const token = this.peek();
    switch (token.type) {
      case TokenType.Identifier:
        return this.parseVariableDeclaration();
      default:
        throw new Error(`Unexpected token type: ${token.type}`);
    }
  }

  private parseVariableDeclaration(): VariableDeclaration {
    const declarations: VariableDeclarator[] = [];
    const id = this.parseIdentifier();
    this.expect(TokenType.Operator); // Expect '='
    const init = this.parseLiteral();
    declarations.push({ id, init });

    return {
      type: "VariableDeclaration",
      declarations,
    };
  }

  private parseIdentifier(): Identifier {
    const token = this.expect(TokenType.Identifier);
    return {
      type: "Identifier",
      name: token.value,
    };
  }

  private parseLiteral(): Literal {
    const token = this.expect(TokenType.Number);
    return {
      type: "Literal",
      value: Number(token.value),
    };
  }
}

import { Token, TokenType } from "./tokens";
import {
  ASTNode,
  Program,
  VariableDeclaration,
  FunctionDeclaration,
  ReturnStatement,
  BinaryExpression,
  Identifier,
  Literal,
  BlockStatement,
  Expression,
  Statement,
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
      case TokenType.Keyword:
        if (token.value === "var") {
          return this.parseVariableDeclaration();
        } else if (token.value === "function") {
          return this.parseFunctionDeclaration();
        } else if (token.value === "return") {
          return this.parseReturnStatement();
        }
        break;
      default:
        throw new Error(`Unexpected token type: ${token.type}`);
    }
    throw new Error(`Unexpected token value: ${token.value}`);
  }

  private parseVariableDeclaration(): VariableDeclaration {
    this.expect(TokenType.Keyword); // 'var', 'let', 'const'
    const id = this.parseIdentifier();
    this.expect(TokenType.Operator); // Expect '='
    const init = this.parseLiteral();
    this.expect(TokenType.Punctuation); // Expect ';'
    return {
      type: "VariableDeclaration",
      declarations: [{ id, init }],
    };
  }

  private parseFunctionDeclaration(): FunctionDeclaration {
    this.expect(TokenType.Keyword); // 'function'
    const id = this.parseIdentifier();
    this.expect(TokenType.Punctuation); // Expect '('
    const params: Identifier[] = [];
    while (
      this.peek().type !== TokenType.Punctuation ||
      this.peek().value !== ")"
    ) {
      params.push(this.parseIdentifier());
      if (
        this.peek().type === TokenType.Punctuation &&
        this.peek().value === ","
      ) {
        this.advance();
      }
    }
    this.expect(TokenType.Punctuation); // Expect ')'
    const body = this.parseBlockStatement();
    return {
      type: "FunctionDeclaration",
      id,
      params,
      body,
    };
  }

  private parseBlockStatement(): BlockStatement {
    this.expect(TokenType.Punctuation); // Expect '{'
    const body: Statement[] = [];
    while (
      this.peek().type !== TokenType.Punctuation ||
      this.peek().value !== "}"
    ) {
      body.push(this.parseStatement());
    }
    this.expect(TokenType.Punctuation); // Expect '}'
    return {
      type: "BlockStatement",
      body,
    };
  }

  private parseReturnStatement(): ReturnStatement {
    this.expect(TokenType.Keyword); // 'return'
    const argument = this.parseExpression();
    this.expect(TokenType.Punctuation); // Expect ';'
    return {
      type: "ReturnStatement",
      argument,
    };
  }

  private parseExpression(): Expression {
    const left = this.parsePrimaryExpression();
    if (this.peek().type === TokenType.Operator) {
      const operator = this.advance().value;
      const right = this.parsePrimaryExpression();
      return {
        type: "BinaryExpression",
        operator,
        left,
        right,
      } as BinaryExpression;
    }
    return left;
  }

  private parsePrimaryExpression(): Expression {
    const token = this.peek();
    switch (token.type) {
      case TokenType.Identifier:
        return this.parseIdentifier();
      case TokenType.Number:
        return this.parseLiteral();
      default:
        throw new Error(`Unexpected token type: ${token.type}`);
    }
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

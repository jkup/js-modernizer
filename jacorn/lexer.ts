import { Token, TokenType } from "./tokens";

export class Lexer {
  private code: string;
  private position: number = 0;
  private line: number = 1;
  private column: number = 0;

  constructor(code: string) {
    this.code = code;
  }

  private isWhitespace(char: string): boolean {
    return /\s/.test(char);
  }

  private isDigit(char: string): boolean {
    return /[0-9]/.test(char);
  }

  private isLetter(char: string): boolean {
    return /[a-zA-Z]/.test(char);
  }

  private advance(): string {
    const char = this.code[this.position++];
    if (char === "\n") {
      this.line++;
      this.column = 0;
    } else {
      this.column++;
    }
    return char;
  }

  private peek(): string {
    return this.code[this.position];
  }

  private createToken(type: TokenType, value: string): Token {
    return { type, value, line: this.line, column: this.column };
  }

  public tokenize(): Token[] {
    const tokens: Token[] = [];

    while (this.position < this.code.length) {
      let char = this.peek();

      if (this.isWhitespace(char)) {
        this.advance();
        continue;
      }

      if (this.isDigit(char)) {
        let value = "";
        while (this.isDigit(this.peek())) {
          value += this.advance();
        }
        tokens.push(this.createToken(TokenType.Number, value));
        continue;
      }

      if (this.isLetter(char)) {
        let value = "";
        while (this.isLetter(this.peek())) {
          value += this.advance();
        }
        tokens.push(this.createToken(TokenType.Identifier, value));
        continue;
      }

      // Handle other cases: operators, punctuation, etc.

      this.advance();
    }

    tokens.push(this.createToken(TokenType.EOF, ""));
    return tokens;
  }
}

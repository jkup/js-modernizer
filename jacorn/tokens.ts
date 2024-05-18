export enum TokenType {
  Keyword,
  Identifier,
  Number,
  String,
  Operator,
  Punctuation,
  Whitespace,
  Comment,
  EOF,
}

export interface Token {
  type: TokenType;
  value: string;
  line: number;
  column: number;
}

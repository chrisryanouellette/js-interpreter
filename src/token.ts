const ILLEGAL = "ILLEGAL";
const EOF = "";

// Identifiers + Literals
const IDENT = "IDENT"; // add, foobar, x, y
const INT = "INT"; // 123

// Operators
const ASSIGN = "=";
const PLUS = "+";
const MINUS = "-";
const BANG = "!";
const ASTERISK = "*";
const SLASH = "/";

const GT = ">";
const LT = "<";

// Delimiters
const COMMA = ",";
const SEMICOLON = ";";

const LPAREN = "(";
const RPAREN = ")";
const LBRACE = "{";
const RBRACE = "}";

// Keywords
const FUNCTION = "fn";
const LET = "let";

export const tokens = {
  ILLEGAL,
  EOF,
  INT,
  IDENT,
  ASSIGN,
  PLUS,
  MINUS,
  BANG,
  ASTERISK,
  SLASH,
  GT,
  LT,
  COMMA,
  SEMICOLON,
  LPAREN,
  RPAREN,
  LBRACE,
  RBRACE,
  FUNCTION,
  LET,
} as const;

export const keywords = {
  [FUNCTION]: "FUNCTION",
  [LET]: "LET",
} as const;

export type TokenType = keyof typeof tokens;
export type TokenValue = string;

export type Token = {
  type: TokenType;
  literal: TokenValue;
};

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
const EQ = "==";
const NOT_EQ = "!=";

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
const TRUE = "true";
const FALSE = "false";
const IF = "if";
const ELSE = "else";
const RETURN = "return";

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
  EQ,
  NOT_EQ,
  GT,
  LT,
  COMMA,
  SEMICOLON,
  LPAREN,
  RPAREN,
  LBRACE,
  RBRACE,
} as const;

export const keywords = {
  [FUNCTION]: "FUNCTION",
  [LET]: "LET",
  [TRUE]: "TRUE",
  [FALSE]: "FALSE",
  [IF]: "IF",
  [ELSE]: "ELSE",
  [RETURN]: "RETURN",
} as const;

export type TokenType = keyof typeof tokens | typeof keywords[keyof typeof keywords];
export type TokenValue = string;

export type Token = {
  type: TokenType;
  literal: TokenValue;
};

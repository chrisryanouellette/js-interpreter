import { Token, TokenType, TokenValue, keywords, tokens } from "./token";
import { isObjKey } from "./utils";

type Lexer = {
  input: string;
  position: number; // current position in input ( points to the current char )
  readPosition: number; // current reading position in input ( after current char )
  ch: string | null; // current character under examination
};

export function readChar(l: Lexer) {
  if (l.readPosition >= l.input.length) {
    l.ch = null; // end of input
  } else {
    l.ch = l.input[l.readPosition];
  }
  l.position = l.readPosition;
  l.readPosition += 1;
}

function newToken(tokenType: TokenType, ch: TokenValue): Token {
  return { type: tokenType, literal: ch };
}

function readIdentifier(l: Lexer) {
  const position = l.position;
  while (typeof l.ch === "string" && isLetter(l.ch)) {
    readChar(l);
  }
  return l.input.slice(position, l.position);
}

function isLetter(char: string) {
  const code = char.charCodeAt(0);
  const isLowercaseChar =
    "a".charCodeAt(0) <= code && "z".charCodeAt(0) <= code;
  const isUppercaseChar =
    "A".charCodeAt(0) <= code && "Z".charCodeAt(0) <= code;
  const isUnderscore = "-".charCodeAt(0) === code;

  return isLowercaseChar || isUppercaseChar || isUnderscore;
}

function readNumber(l: Lexer): string {
  const position = l.position;
  while (typeof l.ch === "string" && isDigit(l.ch)) {
    readChar(l);
  }
  return l.input.slice(position, l.position);
}

function isDigit(char: string): boolean {
  const code = char.charCodeAt(0);
  return "0".charCodeAt(0) <= code && code <= "9".charCodeAt(0);
}

function lookupIdent(ident: string): TokenType {
  if (isObjKey(ident, keywords)) {
    return keywords[ident];
  }
  return tokens.IDENT;
}

function skipWhiteSpace(l: Lexer) {
  while (l.ch === " " || l.ch === "\t" || l.ch === "\n" || l.ch === "\r") {
    readChar(l);
  }
}

function peekChar(l: Lexer): string | null {
  if (l.readPosition >= l.input.length) {
    return null;
  } else {
    return l.input[l.readPosition];
  }
}

export function nextToken(l: Lexer): Token {
  let tok: Token;

  skipWhiteSpace(l);

  switch (l.ch) {
    case "=": {
      if (peekChar(l) === "=") {
        const ch = l.ch;
        readChar(l);
        tok = newToken("EQ", `${ch}${l.ch}`);
      } else {
        tok = newToken("ASSIGN", l.ch);
      }
      break;
    }
    case ";": {
      tok = newToken("SEMICOLON", l.ch);
      break;
    }
    case "(": {
      tok = newToken("LPAREN", l.ch);
      break;
    }
    case ")": {
      tok = newToken("RPAREN", l.ch);
      break;
    }
    case ",": {
      tok = newToken("COMMA", l.ch);
      break;
    }
    case "+": {
      tok = newToken("PLUS", l.ch);
      break;
    }
    case "-": {
      tok = newToken("MINUS", l.ch);
      break;
    }
    case "!": {
      if (peekChar(l) === "=") {
        const ch = l.ch;
        readChar(l);
        tok = newToken("NOT_EQ", `${ch}${l.ch}`);
      } else {
        tok = newToken("BANG", l.ch);
      }
      break;
    }
    case "/": {
      tok = newToken("SLASH", l.ch);
      break;
    }
    case "*": {
      tok = newToken("ASTERISK", l.ch);
      break;
    }
    case "<": {
      tok = newToken("LT", l.ch);
      break;
    }
    case ">": {
      tok = newToken("GT", l.ch);
      break;
    }
    case "{": {
      tok = newToken("LBRACE", l.ch);
      break;
    }
    case "}": {
      tok = newToken("RBRACE", l.ch);
      break;
    }
    case null: {
      tok = { type: "EOF", literal: "" };
      break;
    }
    default: {
      if (isLetter(l.ch)) {
        const literal = readIdentifier(l);
        return { literal: literal, type: lookupIdent(literal) };
      } else if (isDigit(l.ch)) {
        return { type: tokens.INT, literal: readNumber(l) };
      } else {
        tok = newToken("ILLEGAL", l.ch);
      }
      break;
    }
  }
  readChar(l);
  return tok;
}

export function New(input: string): Lexer {
  const l: Lexer = { input, readPosition: 0, position: 0, ch: null };
  readChar(l);

  return l;
}

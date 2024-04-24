import fs from "fs";
import path from "path";
import { New, nextToken } from "../lexer";
import { TokenType, TokenValue } from "../token";

describe("Will use the lexer to decode tokens", () => {
  const url = path.resolve(__dirname, "../index.monkey");
  const input = fs.readFileSync(url).toString();

  const tests: [name: TokenType, token: TokenValue][] = [
    ["LET", "let"],
    ["IDENT", "five"],
    ["ASSIGN", "="],
    ["INT", "5"],
    ["SEMICOLON", ";"],
    ["LET", "let"],
    ["IDENT", "ten"],
    ["ASSIGN", "="],
    ["INT", "10"],
    ["SEMICOLON", ";"],
    ["LET", "let"],
    ["IDENT", "add"],
    ["ASSIGN", "="],
    ["FUNCTION", "fn"],
    ["LPAREN", "("],
    ["IDENT", "x"],
    ["COMMA", ","],
    ["IDENT", "y"],
    ["RPAREN", ")"],
    ["LBRACE", "{"],
    ["IDENT", "x"],
    ["PLUS", "+"],
    ["IDENT", "y"],
    ["SEMICOLON", ";"],
    ["RBRACE", "}"],
    ["SEMICOLON", ";"],
    ["LET", "let"],
    ["IDENT", "result"],
    ["ASSIGN", "="],
    ["FUNCTION", "fn"],
    ["LPAREN", "("],
    ["IDENT", "five"],
    ["COMMA", ","],
    ["IDENT", "ten"],
    ["RPAREN", ")"],
    ["SEMICOLON", ";"],
    ["BANG", "!"],
    ["MINUS", "-"],
    ["SLASH", "/"],
    ["ASTERISK", "*"],
    ["INT", "5"],
    ["SEMICOLON", ";"],
    ["INT", "5"],
    ["LT", "<"],
    ["INT", "10"],
    ["GT", ">"],
    ["INT", "5"],
    ["SEMICOLON", ";"],
    ["IF", "if"],
    ["LPAREN", "("],
    ["INT", "5"],
    ["LT", "<"],
    ["INT", "10"],
    ["RPAREN", ")"],
    ["LBRACE", "{"],
    ["RETURN", "return"],
    ["TRUE", "true"],
    ["SEMICOLON", ";"],
    ["RBRACE", "}"],
    ["ELSE", "else"],
    ["LBRACE", "{"],
    ["RETURN", "return"],
    ["FALSE", "false"],
    ["SEMICOLON", ";"],
    ["RBRACE", "}"],
    ["INT", "10"],
    ["EQ", "=="],
    ["INT", "10"],
    ["SEMICOLON", ";"],
    ["INT", "10"],
    ["NOT_EQ", "!="],
    ["INT", "9"],
    ["SEMICOLON", ";"],
    ["EOF", ""]
  ];

  const l = New(input);

  for (let i = 0; i < tests.length; i++) {
    const tt = tests[i];
    const tok = nextToken(l);

    it(`Will parse a "${tt[1]}" as a ${tt[0]}`, () => {
      expect(tok.type).toBe(tt[0]);
      expect(tok.literal).toBe(tt[1]);
    });
  }
});

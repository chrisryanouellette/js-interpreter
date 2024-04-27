import { stdin, stdout } from "node:process";
import readline from "node:readline/promises";
import { New, nextToken } from "./lexer";

const PROMPT = ">> ";
const rl = readline.createInterface({ input: stdin, output: stdout });

export async function start(): Promise<void> {
  const result = await rl.question(PROMPT);
  if (!result.trim()) return;

  const l = New(result);
  for (let tok = nextToken(l); tok.type !== "EOF"; tok = nextToken(l)) {
    console.log(tok);
  }
}

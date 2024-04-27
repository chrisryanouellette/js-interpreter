import os from "os";
import { start } from "./repl";

const user = os.userInfo().username;

console.log(`Hello ${user}! This is the monkey programming language!`);
console.log("Feel free to type some commands.");

start().then(() => process.exit(0));

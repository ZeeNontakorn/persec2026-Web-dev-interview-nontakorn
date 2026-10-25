import readline from "node:readline/promises";
import { q01 } from "./q01-checkBrackets";
import { q02 } from "./q02-naturalSort";
import { q03 } from "./q03-autocomplete";
import { q04A, q04B } from "./q04-romanNumerals";
import { q05 } from "./q05-maxFromDigits";
import { q06 } from "./q06-tribonacci";

import type { Question } from "./types";
const questions: Question[] = [q01, q02, q03, q04A, q04B, q05, q06];

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  try {
    while (true) {
      console.log("\n=== เลือกข้อที่ต้องการ ===");
      questions.forEach((q, i) => console.log(`${i + 1}. ${q.title}`));
      console.log("0. ออก");

      const choice = Number(await rl.question(">: "));
      if (choice === 0) break;
      const q = questions[choice - 1];
      if (!q) {
        console.log("เลือกไม่ถูกต้อง");
        continue;
      }

      const inputs: string[] = [];
      for (const p of q.prompts) {
        while (true) {
          const value = await rl.question(p.label);
          const err = p.validate?.(value);
          if (!err) {
            inputs.push(value);
            break;
          } else {
            console.log("X ", err);
          }
        }
      }
      try {
        console.log("ผลลัพธ์:", q.run(inputs));
      } catch (e) {
        console.log("ผิดพลาด:", e instanceof Error ? e.message : e);
      }
    }
  } catch {
  } finally {
    rl.close();
  }
}

main();

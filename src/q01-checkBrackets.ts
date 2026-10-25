import type { Question } from "./types";

/**
 * Q01: Check Brackets
 * โจทย์: รับ string ที่มีเฉพาะ ( ) [ ] { } แล้วตรวจว่าเปิด-ปิดครบคู่และถูกลำดับหรือไม่
 *        คืน true/false
 * แนวคิด: ใช้ stack — เจอตัวเปิดให้ push, เจอตัวปิดต้องตรงคู่กับตัวบนสุดของ stack แล้ว pop
 *         ถ้าไม่ตรงคู่ (รวมกรณี stack ว่าง) คืน false ทันที จบแล้ว stack ต้องว่างจึงเป็น true
 *         ความยาวคี่คืน false ได้เลย (ไม่ต้องวนลูป)
 */
export function checkBrackets(text: string): boolean {
  if (text.length % 2 != 0) {
    return false;
  }
  const stack: string[] = [];
  const pairs: Record<string, string> = {
    ")": "(",
    "]": "[",
    "}": "{",
  };
  for (const ch of text) {
    if (!pairs[ch]) {
      stack.push(ch);
    } else {
      if (pairs[ch] == stack.at(-1)) {
        stack.pop();
      } else {
        return false;  // กรณี คู่ไม่ตรง
      }
    }
  }
  if (stack.length === 0) { // กรณี ((
    return true;
  } else {
    return false;
  }
}
export const q01: Question = {
  id: "q01",
  title: "Check Brackets",
  prompts: [
    {
      label: "ข้อความที่ต้องการตรวจ: ",
      validate: (v) =>
        /^[()[\]{}]*$/.test(v) && v != null
          ? undefined
          : "กรอกได้เฉพาะ ( ) [ ] { }",
    },
  ],
  run: ([text = ""]) => checkBrackets(text),
};

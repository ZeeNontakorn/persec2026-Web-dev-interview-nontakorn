import type { Question } from "./types";

/**
 * Q05: Sort Digits Descending
 * โจทย์: รับ positive int แล้วเรียงตัวเลขในแต่ละหลักจากมากไปน้อย คืนเป็น int
 *        เช่น 3008 => 8300, 1989 => 9981
 * แนวคิด: แปลงเป็น string → แยกเป็นทีละตัวอักษร → เรียงมากไปน้อย → รวมกลับ → แปลงเป็น number
 *         (เลข 0 จะไปอยู่ท้ายเสมอเพราะเรียงจากมากไปน้อย)
 */
export function sortDigitsDesc(number: number): number {
  const sorted = Number(
    [...String(number)].sort((a, b) => Number(b) - Number(a)).join(""),
  );
  return sorted;
}

export const q05: Question = {
  id: "q05",
  title: "Sort Digits Desc",
  prompts: [
    {
      label: "จำนวนเต็มบวก: ",
      validate: (v) =>
        /^[1-9]\d*$/.test(v.trim()) ? undefined : "กรอกจำนวนเต็มบวกเท่านั้น",
    },
  ],
  run: ([text = ""]) => sortDigitsDesc(Number(text)),
};

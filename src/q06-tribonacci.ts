import type { Question } from "./types";

/**
 * Q06: Tribonacci
 * โจทย์: รับค่าเริ่มต้น (int 0-3 ตัว) และจำนวนที่ต้องการ (non-negative int, นับรวมค่าเริ่มต้น)
 *        คืนลำดับที่แต่ละตัวถัดไปเท่ากับผลบวกของ 3 ตัวก่อนหน้า
 *        เช่น ([1,3,5], 5) => [1,3,5,9,17]
 * แนวคิด: คัดลอกค่าเริ่มต้น เติม 0 ให้ครบ 3 ตัว แล้ววนสร้างตัวถัดไปจนครบ count
 *         สุดท้าย slice(0, count) เพื่อให้ผลลัพธ์ยาว count เสมอ
 *         (ใช้ได้กับ count = 0 และ count ที่น้อยกว่าจำนวนค่าเริ่มต้น)
 * ข้อสมมติฐาน: 
 * สิ่งที่ทำขึ้นนอกเหนือโจทย์
 * ถ้าค่าเริ่มต้นไม่ครบ 3 ตัว จะเติม 0 ต่อท้ายให้ครบ และนับรวมในผลลัพธ์
 *              เช่น ([1], 5) => [1,0,0,1,1]
 */
export function tribonacci(starter: number[], count: number): number[] {
  const result: number[] = [...starter];
  while (result.length < 3) result.push(0);

  for (let index = 0; index < count; index++) {
    if (index >= 3) {
      const resultOne: number = result[index - 1] ?? 0;
      const resultTwo: number = result[index - 2] ?? 0;
      const resultThree: number = result[index - 3] ?? 0;

      result.push(resultOne + resultTwo + resultThree);
    }
  }
  return result.slice(0, count);
}

export const q06: Question = {
  id: "q06",
  title: "Tribonacci",
  prompts: [
    {
      label: "ค่าเริ่มต้น 0-3 ตัว คั่นด้วย , (เว้นว่างได้): ",
      validate: (v) => {
        const text = v.trim();
        if (text === "") return undefined; // ว่าง = []
        const parts = text.split(",").map((s) => s.trim());
        if (parts.length > 3) return "ใส่ได้ไม่เกิน 3 ตัว";
        return parts.every((p) => /^-?\d+$/.test(p))
          ? undefined
          : "กรอกเป็นจำนวนเต็มคั่นด้วย , เช่น 1,3,5";
      },
    },
    {
      label: "จำนวนที่ต้องการ (รวมค่าเริ่มต้น, 0 ขึ้นไป): ",
      validate: (v) =>
        /^\d+$/.test(v.trim()) ? undefined : "กรอกเป็นจำนวนเต็มไม่ติดลบ",
    },
  ],
  run: ([starterText = "", count = ""]) => {
    const starter =
      starterText.trim() === ""
        ? []
        : starterText.split(",").map((s) => Number(s.trim()));
    return tribonacci(starter, Number(count));
  },
};

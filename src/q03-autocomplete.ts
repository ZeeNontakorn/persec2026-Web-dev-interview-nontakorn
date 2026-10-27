import type { Question } from "./types";

/**
 * Q03: Autocomplete
 * โจทย์: รับ search, items (string[]) และ maxResult ค้นหา search ใน items โดยไม่สนตัวพิมพ์เล็กใหญ่
 *        ผลลัพธ์เรียงลำดับ: ขึ้นต้นด้วย search => อยู่กลางคำ => อยู่ท้ายคำ แล้วตัดเหลือ maxResult ตัว
 * แนวคิด: filter ค่าที่มี search อยู่ข้างใน แล้วแยกเป็น 3 กลุ่ม
 *         - ขึ้นต้น: startsWith
 *         - ท้าย: endsWith และไม่ขึ้นต้น (กันค่าที่ทั้งขึ้นต้นและลงท้ายไปซ้ำ)
 *         - กลาง: ที่เหลือ
 *         ต่อกันแล้ว slice(0, maxResult) ภายในกลุ่มคงลำดับเดิมจาก items
 *         เทียบด้วยตัวพิมพ์เล็กแต่คืนค่าเดิม
 */

export function autocomplete(
  search: string,
  item: string[],
  maxResult: number,
): string[] {
  const foundItem = [...item].filter((value) =>
    value.toLowerCase().includes(search.toLowerCase()),
  );
  const startItem = foundItem.filter((value) =>
    value.toLowerCase().startsWith(search.toLowerCase()),
  );
  const endItem = foundItem.filter(
    (value) =>
      value.toLowerCase().endsWith(search.toLowerCase()) &&
      !value.toLowerCase().startsWith(search.toLowerCase()),
  );
  const midItem = foundItem.filter(
    (value) => !startItem.includes(value) && !endItem.includes(value),
  );

  const merged = [...startItem, ...midItem, ...endItem].slice(0, maxResult);
  return merged;
}

export const q03: Question = {
  id: "q03",
  title: "Autocomplete",
  prompts: [
    { label: "search: " },
    {
      label: "กรอกเป็นจำนวนเต็มคั่นด้วย , เช่น Think, Mother : ",
      validate: (v) =>
        v.trim() === "" ? "กรุณากรอกอย่างน้อย 1 ค่า" : undefined,
    },
    {
      label: "maxResult: ",
      validate: (v) =>
        /^\d+$/.test(v.trim()) ? undefined : "กรอกเป็นจำนวนเต็มไม่ติดลบ",
    },
  ],
  run: ([search = "", item = "", maxResult = ""]) =>
    autocomplete(
      search,
      item.split(",").map((s) => s.trim()),
      Number(maxResult),
    ),
};

import type { Question } from "./types";

/**
 * Q02: Natural Sort
 * โจทย์: รับ array ของ string แล้วเรียงลำดับโดยดูจากตัวอย่างเป็นหลัก
 *        คือตัวอักษรนำหน้าก่อน แล้วตามด้วยตัวเลขในข้อความ (เช่น TH2 มาก่อน TH19)
 * แนวคิด: ใช้ localeCompare แบบ numeric: true ซึ่งมองตัวเลขที่ติดกันเป็นตัวเลขทั้งก้อน
 *         คัดลอก array ก่อนเรียง ([...text]) เพื่อไม่แก้ค่าของผู้เรียก
 */

// "th" ใช้กฎเรียงลำดับของภาษาไทย (locale)
//numeric: true มองตัวเลขที่ติดกันในสตริงเป็น ตัวเลขทั้งก้อน
export function naturalSort(text: string[]): string[] {
  
  const sorted = [...text].sort((a, b) => a.localeCompare(b, "th", { numeric: true }));
  return sorted;
}

export const q02: Question = {
  id: "q02",
  title: "Natural Sort",
  prompts: [
    {
      label: "ข้อความที่ต้องการเรียง(ใส่ , เพื่อแยก array): ",
    },
  ],
  run: ([text = ""]) => naturalSort(text.split(",").map((s) => s.trim())),
};

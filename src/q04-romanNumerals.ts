import type { Question } from "./types";

/**
 * Q04: Modern Roman Numerals
 * โจทย์: เขียน 2 ฟังก์ชัน
 *        - intToRoman: รับ int (1-3999) คืนเลขโรมันเป็น string เช่น 1989 => MCMLXXXIX
 *        - romanToInt: รับเลขโรมันเป็น string คืนเป็นตัวเลข
 *        ใช้กฎการลบ เช่น IV = 4, IX = 9, CM = 900
 * แนวคิด:
 *   intToRoman: แยกเลขเป็นหลักพัน/ร้อย/สิบ/หน่วย แล้วดึงสัญลักษณ์จากตารางของแต่ละหลัก
 *               (index 0 = "" สำหรับหลักที่เป็น 0)
 *   romanToInt: อ่านซ้ายไปขวา ถ้าตัวนี้น้อยกว่าตัวถัดไปให้ลบ นอกนั้นบวก
 * สิ่งที่ทำขึ้นนอกเหนือโจทย์:
 *   - รองรับช่วง 1-3999
 *   - romanToInt รับตัวพิมพ์ใหญ่ (เมนูแปลงให้ก่อน)
 *   - romanToInt คืน int เสมอ แม้รูปแบบไม่มาตรฐาน (เช่น IIII => 4) หรือเกิน 3999
 *     ส่วนการเตือนอยู่ที่ romanWarning ซึ่งเมนู (q04B) เรียกใช้แล้วแสดงข้อความ
 *     เช่น "4 แต่ IIII ไม่ใช่รูปแบบมาตรฐาน (รูปแบบที่ถูกคือ IV)"
 */

export function intToRoman(num: number): string {
  const thousands = Math.floor(num / 1000);
  const hundreds = Math.floor((num % 1000) / 100);
  const tens = Math.floor((num % 100) / 10);
  const ones = num % 10;
  const romanThousandNumber: string[] = ["", "M", "MM", "MMM"];
  const romanHundredNumber: string[] = [
    "",
    "C",
    "CC",
    "CCC",
    "CD",
    "D",
    "DC",
    "DCC",
    "DCCC",
    "CM",
  ];
  const romanTenNumber: string[] = [
    "",
    "X",
    "XX",
    "XXX",
    "XL",
    "L",
    "LX",
    "LXX",
    "LXXX",
    "XC",
  ];
  const romanOneNumber: string[] = [
    "",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
  ];
  const result = `${romanThousandNumber[thousands]}${romanHundredNumber[hundreds]}${romanTenNumber[tens]}${romanOneNumber[ones]}`;
  return result;
}

export function romanToInt(roman: string): number {
  const romanOneDigit: string[] = roman.split("");
  const romanToNumber: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let result: number = 0;
  for (let index = 0; index < romanOneDigit.length; index++) {
    const currentNumber = romanToNumber[romanOneDigit[index] ?? ""] ?? 0;
    const NextNumber = romanToNumber[romanOneDigit[index + 1] ?? ""] ?? 0;
    if (currentNumber >= NextNumber) {
      result = result + currentNumber;
    } else {
      result = result - currentNumber;
    }
  }
  return result;
}

// ตรวจเลขโรมันที่ผิดกฎ คืนข้อความเตือน (ถ้าถูกกฎคืน undefined)
// แยกออกจาก romanToInt เพื่อให้ romanToInt คืนเป็น int อย่างเดียว
export function romanWarning(roman: string, value: number): string | undefined {
  if (value > 3999) {
    return `${value} แต่เลขโรมันมีได้แค่ 1-3999`;
  }
  if (value < 1) {
    return `${roman} ให้ค่า ${value} ซึ่งไม่ใช่เลขโรมันที่ถูกต้อง`;
  }
  const standard = intToRoman(value);
  if (standard !== roman) {
    return `${value} แต่ ${roman} ไม่ใช่รูปแบบมาตรฐาน (รูปแบบที่ถูกคือ ${standard})`;
  }
  return undefined;
}

export const q04A: Question = {
  id: "q04A",
  title: "Roman: ตัวเลข → โรมัน",
  prompts: [
    {
      label: "กรอกหมายเลข: ",
      validate: (v) => {
        if (!/^\d+$/.test(v.trim())) return "กรอกเป็นจำนวนเต็มบวก";
        const n = Number(v);
        return n >= 1 && n <= 3999 ? undefined : "ต้องอยู่ระหว่าง 1-3999";
      },
    },
  ],
  run: ([text = ""]) => intToRoman(Number(text)),
};

export const q04B: Question = {
  id: "q04B",
  title: "Roman: โรมัน → ตัวเลข",
  prompts: [
    {
      label: "กรอกหมายเลขโรมัน (เช่น MCMLXXXIX): ",
      validate: (v) =>
        /^[IVXLCDM]+$/i.test(v) && v != null
          ? undefined
          : "I, V, X, L, C, D, M",
    },
  ],
  run: ([text = ""]) => {
    const roman = text.trim().toUpperCase();
    const value = romanToInt(roman);
    const warning = romanWarning(roman, value);
    if (warning) console.log(warning);
    return value;
  },
};

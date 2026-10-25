import { describe, it, expect } from "vitest";
import {
  intToRoman,
  romanToInt,
  romanWarning,
} from "../src/q04-romanNumerals";

/**
 * Q04 Roman Numerals - กรณีที่ทดสอบ
 *  1) ตัวอย่างจากโจทย์ (4 ค่า)
 *  2) เคสที่เพิ่มเอง: คู่ลบ (IV, IX, XL, XC, CD, CM), ขอบเขต 1 และ 3999
 *  3) แปลงไปแล้วกลับ ต้องได้ค่าเดิมทุกค่า 1-3999
 *  4) romanToInt กับ input ที่ไม่ใช่รูปแบบมาตรฐาน หรือเกิน 3999 ต้องยังคืน int
 *     ส่วนข้อความเตือนทดสอบผ่าน romanWarning (ที่เมนูนำไปแสดง)
 */
const examples: [number, string][] = [
  [1989, "MCMLXXXIX"],
  [2000, "MM"],
  [68, "LXVIII"],
  [109, "CIX"],
];

const extra: [number, string][] = [
  [1, "I"],
  [4, "IV"],
  [9, "IX"],
  [40, "XL"],
  [90, "XC"],
  [400, "CD"],
  [900, "CM"],
  [1994, "MCMXCIV"],
  [3999, "MMMCMXCIX"],
];

describe("Q04 intToRoman", () => {
  it.each(examples)("ตัวอย่างโจทย์ %i => %s", (n, roman) => {
    expect(intToRoman(n)).toBe(roman);
  });
  it.each(extra)("เพิ่มเอง %i => %s", (n, roman) => {
    expect(intToRoman(n)).toBe(roman);
  });
});

describe("Q04 romanToInt", () => {
  it.each(examples)("ตัวอย่างโจทย์ %i <= %s", (n, roman) => {
    expect(romanToInt(roman)).toBe(n);
  });
  it.each(extra)("เพิ่มเอง %i <= %s", (n, roman) => {
    expect(romanToInt(roman)).toBe(n);
  });

  it("เพิ่มเอง: IIII ไม่ใช่รูปแบบมาตรฐาน แต่ยังคืน int เป็น 4", () => {
    expect(romanToInt("IIII")).toBe(4);
  });

  it("เพิ่มเอง: MMMM เกิน 3999 แต่ยังคืน int เป็น 4000", () => {
    expect(romanToInt("MMMM")).toBe(4000);
  });
});

describe("Q04 romanWarning (ข้อความเตือนที่เมนูแสดง)", () => {
  it("รูปแบบมาตรฐาน ไม่มีคำเตือน", () => {
    expect(romanWarning("MCMLXXXIX", 1989)).toBeUndefined();
  });
  it("เพิ่มเอง: IIII เตือนและบอกรูปแบบที่ถูกคือ IV", () => {
    const w = romanWarning("IIII", 4);
    expect(w).toContain("ไม่ใช่รูปแบบมาตรฐาน");
    expect(w).toContain("IV");
  });
  it("เพิ่มเอง: VX เตือนว่าไม่ใช่รูปแบบมาตรฐาน", () => {
    expect(romanWarning("VX", 5)).toContain("ไม่ใช่รูปแบบมาตรฐาน");
  });
  it("เพิ่มเอง: MMMM เตือนว่าเกิน 3999", () => {
    expect(romanWarning("MMMM", 4000)).toContain("1-3999");
  });
});

describe("Q04 แปลงไปกลับ", () => {
  it("ทุกค่า 1-3999 แปลงเป็นโรมันแล้วกลับได้ค่าเดิม", () => {
    const bad: number[] = [];
    for (let n = 1; n <= 3999; n++) {
      if (romanToInt(intToRoman(n)) !== n) bad.push(n);
    }
    expect(bad).toEqual([]);
  });
});

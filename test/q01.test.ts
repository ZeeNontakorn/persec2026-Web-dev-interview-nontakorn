import { describe, it, expect } from "vitest";
import { checkBrackets } from "../src/q01-checkBrackets";

/**
 * Q01 checkBrackets - กรณีที่ทดสอบ
 *  1) ตัวอย่างจากโจทย์ (7 ข้อ)
 *  2) เคสที่เพิ่มเอง: คู่ต่อกัน, คู่ซ้อนกัน, ปิดก่อนเปิด, ปิดผิดชนิด,
 *     เปิดค้างทั้งสตริง, สตริงว่าง
 */
describe("Q01 checkBrackets", () => {
  describe("ตัวอย่างจากโจทย์", () => {
    const cases: [string, boolean][] = [
      ["()", true], // คู่ธรรมดา
      ["([]]", false], // ตัวปิดเกิน
      ["([{}])", true], // ซ้อนกันถูกลำดับ
      ["([[{}]]]", false], // ตัวปิดเกินท้าย
      [")", false], // ตัวปิดตอน stack ว่าง
      ["([)]", false], // ซ้อนผิดลำดับ
      ["{", false], // ตัวเปิดเดี่ยว
    ];
    it.each(cases)("%j => %s", (input, expected) => {
      expect(checkBrackets(input)).toBe(expected);
    });
  });

  describe("เคสที่เพิ่มเอง", () => {
    const cases: [string, boolean][] = [
      ["()()", true], // หลายคู่ต่อกัน
      ["()[]{}", true], // ต่อกันคนละชนิด
      ["(())", true], // ซ้อนกัน
      ["(()())", true], // ผสมซ้อนและต่อกัน
      [")(", false], // ตัวปิดมาก่อนตัวเปิด
      ["())(", false], // คู่แรกครบ แต่ตามด้วยปิดเกินและเปิดค้าง
      ["(]", false], // ปิดผิดชนิด
      ["((", false], // เปิดค้างทั้งสตริง 
      ["))", false], // ปิดล้วน 
      ["(", false], // ความยาวคี่
      ["", true], // สตริงว่าง ถือว่าถูก 
    ];
    it.each(cases)("%j => %s", (input, expected) => {
      expect(checkBrackets(input)).toBe(expected);
    });
  });
});

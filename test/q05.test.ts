import { describe, it, expect } from "vitest";
import { sortDigitsDesc } from "../src/q05-maxFromDigits";

/**
 * Q05 sortDigitsDesc - กรณีที่ทดสอบ
 *  1) ตัวอย่างจากโจทย์ (4 ค่า)
 *  2) เคสที่เพิ่มเอง: หลักเดียว, ลงท้ายด้วย 0, มี 0 หลายตัว, หลักซ้ำทั้งหมด,
 *     เรียงมากไปน้อยอยู่แล้ว, เรียงน้อยไปมาก, 0 อยู่กลาง
 *  3) ชนิดที่คืนต้องเป็น number
 */
describe("Q05 sortDigitsDesc", () => {
  const examples: [number, number][] = [
    [3008, 8300],
    [1989, 9981],
    [2679, 9762],
    [9163, 9631],
  ];
  it.each(examples)("ตัวอย่างโจทย์ %i => %i", (input, expected) => {
    expect(sortDigitsDesc(input)).toBe(expected);
  });

  const extra: [number, number][] = [
    [5, 5], // หลักเดียว
    [10, 10], // 0 ไปท้าย
    [100, 100], // 0 หลายตัว
    [1111, 1111], // หลักซ้ำทั้งหมด
    [987, 987], // เรียงมากไปน้อยอยู่แล้ว
    [123456789, 987654321], // เรียงน้อยไปมาก
    [1001, 1100], // 0 อยู่กลาง
  ];
  it.each(extra)("เพิ่มเอง %i => %i", (input, expected) => {
    expect(sortDigitsDesc(input)).toBe(expected);
  });

  it("เพิ่มเอง: คืนชนิด number", () => {
    expect(typeof sortDigitsDesc(3008)).toBe("number");
  });
});

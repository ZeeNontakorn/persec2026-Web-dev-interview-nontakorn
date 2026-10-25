import { describe, it, expect } from "vitest";
import { naturalSort } from "../src/q02-naturalSort";

/**
 * Q02 naturalSort - กรณีที่ทดสอบ
 *  1) ตัวอย่างจากโจทย์ (2 ข้อ)
 *  2) เคสที่เพิ่มเอง: เลขหลักต่างกัน, array ว่าง, มีตัวเดียว,
 *     ไม่แก้ array เดิมของผู้เรียก
 */
describe("Q02 naturalSort", () => {
  it("ตัวอย่างโจทย์ที่ 1: เรียงตามตัวอักษรนำหน้า แล้วตามตัวเลข", () => {
    expect(naturalSort(["TH19", "SG20", "TH2"])).toEqual([
      "SG20",
      "TH2",
      "TH19",
    ]);
  });

  it("ตัวอย่างโจทย์ที่ 2: มีข้อความต่อท้ายตัวเลข", () => {
    expect(naturalSort(["TH10", "TH3Netflix", "TH1", "TH7"])).toEqual([
      "TH1",
      "TH3Netflix",
      "TH7",
      "TH10",
    ]);
  });

  it("เพิ่มเอง: 2 ต้องมาก่อน 19 (ไม่ใช่เรียงแบบตัวอักษร)", () => {
    expect(naturalSort(["TH19", "TH2"])).toEqual(["TH2", "TH19"]);
  });

  it("เพิ่มเอง: array ว่าง", () => {
    expect(naturalSort([])).toEqual([]);
  });

  it("เพิ่มเอง: มีตัวเดียว", () => {
    expect(naturalSort(["TH5"])).toEqual(["TH5"]);
  });

  it("เพิ่มเอง: ไม่แก้ array เดิมของผู้เรียก", () => {
    const input = ["TH19", "SG20", "TH2"];
    naturalSort(input);
    expect(input).toEqual(["TH19", "SG20", "TH2"]);
  });
});

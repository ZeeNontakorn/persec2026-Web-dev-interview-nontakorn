import { describe, it, expect } from "vitest";
import { autocomplete } from "../src/q03-autocomplete";

/**
 * Q03 autocomplete - กรณีที่ทดสอบ
 *  1) ตัวอย่างจากโจทย์
 *  2) ลำดับกลุ่ม: ขึ้นต้น => กลาง => ท้าย (ภายในกลุ่มคงลำดับเดิมของ items)
 *  3) ค่าที่ทั้งขึ้นต้นและลงท้ายด้วย search ต้องอยู่กลุ่มขึ้นต้น (ไม่ซ้ำ)
 *  4) ไม่สนตัวพิมพ์เล็กใหญ่ และคืนค่าเดิมตามที่อยู่ใน items
 *  5) ขอบเขต: maxResult เป็น 0, มากกว่าที่เจอ, ไม่เจอเลย, items ว่าง
 */
describe("Q03 autocomplete", () => {
  it("ตัวอย่างโจทย์: th, maxResult 2 => Think, Mother", () => {
    expect(
      autocomplete("th", ["Mother", "Think", "Worthy", "Apple", "Android"], 2),
    ).toEqual(["Think", "Mother"]);
  });

  it("เพิ่มเอง: ครบ 3 กลุ่ม ขึ้นต้น => กลาง => ท้าย", () => {
    expect(
      autocomplete("th", ["Earth", "Mother", "Think", "Method"], 4),
    ).toEqual(["Think", "Mother", "Method", "Earth"]);
  });

  it("เพิ่มเอง: ขึ้นต้นและลงท้ายด้วย search อยู่กลุ่มขึ้นต้น ไม่ซ้ำ", () => {
    expect(
      autocomplete("th", ["Earth", "thath", "Mother", "Think"], 4),
    ).toEqual(["thath", "Think", "Mother", "Earth"]);
  });

  it("เพิ่มเอง: ไม่สนตัวพิมพ์ แต่คืนค่าเดิม", () => {
    expect(autocomplete("TH", ["think", "MOTHER"], 5)).toEqual([
      "think",
      "MOTHER",
    ]);
  });

  it("เพิ่มเอง: maxResult มากกว่าที่เจอ คืนเท่าที่มี", () => {
    expect(autocomplete("th", ["Think", "Mother"], 10)).toEqual([
      "Think",
      "Mother",
    ]);
  });

  it("เพิ่มเอง: maxResult เป็น 0", () => {
    expect(autocomplete("th", ["Think"], 0)).toEqual([]);
  });

  it("เพิ่มเอง: ไม่เจอเลย", () => {
    expect(autocomplete("zz", ["Think", "Mother"], 3)).toEqual([]);
  });

  it("เพิ่มเอง: items ว่าง", () => {
    expect(autocomplete("th", [], 3)).toEqual([]);
  });

  it("เพิ่มเอง: ไม่แก้ array เดิมของผู้เรียก", () => {
    const items = ["Mother", "Think"];
    autocomplete("th", items, 2);
    expect(items).toEqual(["Mother", "Think"]);
  });
});

# Logic Test (TypeScript) — Nontakorn

คำตอบแบบทดสอบ Logic Test 6 ข้อ เขียนด้วย TypeScript มีทั้งเมนูให้กรอกข้อมูลทดลองเอง และเทสต์อัตโนมัติ

## วิธีรัน

ต้องมี **Node.js 20 ขึ้นไป** (พัฒนาและทดสอบด้วย Node v20.19.3, npm 10.8.2)

```bash
npm install        # ติดตั้ง dependencies (มี package-lock.json ให้แล้ว)
npm test           # รันเทสต์ทั้งหมด (89 เคส)
npm start          # เปิดเมนูให้ลองกรอกข้อมูลเอง
```

ตรวจ type ของ TypeScript (ต้องไม่มี error):

```bash
npx tsc --noEmit
```

> ถ้า `npm install` ขึ้น error `Cannot read properties of null (reading 'edgesOut')` (บั๊กของ npm 10.8.x เมื่อไม่มี lock file) ให้ใช้ `npm install --legacy-peer-deps`

## ลองกรอกข้อมูลเอง (`npm start`)

รัน `npm start` จะเห็นเมนู เลือกเลขข้อ แล้วกรอกตามที่ถาม พิมพ์ `0` เพื่อออก
**หมายเลขในเมนูไม่ตรงกับเลขข้อของโจทย์ทั้งหมด** เพราะข้อ 4 แยกเป็น 2 รายการ (ดูตารางด้านล่าง)

| เมนู | ข้อ | ตัวอย่างที่กรอก | ผลลัพธ์ |
|---|---|---|---|
| 1 | 1 Check Brackets | `([{}])` | `true` |
| 2 | 2 Natural Sort | `TH19,SG20,TH2` | `[ 'SG20', 'TH2', 'TH19' ]` |
| 3 | 3 Autocomplete | search `th` / items `Mother,Think,Worthy,Apple,Android` / maxResult `2` | `[ 'Think', 'Mother' ]` |
| 4 | 4 ตัวเลข → โรมัน | `1989` | `MCMLXXXIX` |
| 5 | 4 โรมัน → ตัวเลข | `MCMLXXXIX` | `1989` |
| 6 | 5 Sort Digits Desc | `3008` | `8300` |
| 7 | 6 Tribonacci | ค่าเริ่มต้น `1,3,5` / จำนวน `5` | `[ 1, 3, 5, 9, 17 ]` |

- รายการที่มีหลายค่า (ข้อ 2, 3, 7) ให้คั่นด้วย `,`
- ข้อ 7 เว้นช่อง "ค่าเริ่มต้น" ว่างได้ (หมายถึง array ว่าง)
- ถ้ากรอกผิดรูปแบบ เมนูจะแจ้งสาเหตุและให้กรอกใหม่

## สรุปแต่ละข้อ

| ข้อ | ไฟล์ | ฟังก์ชัน | แนวคิด | Time / Space |
|---|---|---|---|---|
| 1 | [src/q01-checkBrackets.ts](src/q01-checkBrackets.ts) | `checkBrackets(text)` | stack: เจอตัวเปิด push, เจอตัวปิดต้องตรงคู่กับตัวบนสุดแล้ว pop | O(n) / O(n) |
| 2 | [src/q02-naturalSort.ts](src/q02-naturalSort.ts) | `naturalSort(items)` | `localeCompare` แบบ `numeric: true` บน array ที่คัดลอกมา | O(n log n) / O(n) |
| 3 | [src/q03-autocomplete.ts](src/q03-autocomplete.ts) | `autocomplete(search, items, maxResult)` | filter แล้วแยก 3 กลุ่ม (ขึ้นต้น → กลาง → ท้าย) ต่อกันแล้ว slice | O(n·m) / O(n) |
| 4 | [src/q04-romanNumerals.ts](src/q04-romanNumerals.ts) | `intToRoman(num)`, `romanToInt(roman)` | แยกเลขเป็นหลักแล้วดึงจากตาราง / อ่านซ้ายไปขวา ถ้าตัวนี้น้อยกว่าตัวถัดไปให้ลบ | O(1) / O(n) |
| 5 | [src/q05-maxFromDigits.ts](src/q05-maxFromDigits.ts) | `sortDigitsDesc(number)` | แยกเป็นตัวอักษร เรียงมากไปน้อย รวมกลับเป็นตัวเลข | O(d log d) |
| 6 | [src/q06-tribonacci.ts](src/q06-tribonacci.ts) | `tribonacci(starter, count)` | เติมค่าเริ่มต้นให้ครบ 3 ตัว สร้างต่อจนครบแล้ว slice | O(n) / O(n) |

คอมเมนต์หัวไฟล์ของแต่ละข้อมีโจทย์ แนวคิด และข้อสมมติฐานโดยละเอียด

## ข้อสมมติฐาน (เรื่องที่โจทย์ไม่ได้ระบุ)

- **ข้อ 1:** สตริงว่าง `""` ถือว่าถูกต้อง (`true`) และ `)(` เป็น `false` (ตัวปิดมาก่อนตัวเปิด)
- **ข้อ 2:** เรียงด้วยกฎของ locale `th` และมองตัวเลขที่ติดกันเป็นตัวเลขทั้งก้อน (`TH2` มาก่อน `TH19`) ฟังก์ชันไม่แก้ array ที่ส่งเข้ามา
- **ข้อ 3:** ไม่สนตัวพิมพ์เล็กใหญ่ แต่คืนค่าตามต้นฉบับใน items ภายในกลุ่มเดียวกันคงลำดับเดิม ค่าที่ทั้งขึ้นต้นและลงท้ายด้วย search นับเป็นกลุ่ม "ขึ้นต้น"
- **ข้อ 4:**
  - รองรับช่วง 1-3999
  - `romanToInt` คืน `int` เสมอ แม้รูปแบบไม่มาตรฐาน (เช่น `IIII` ได้ `4`) หรือเกิน 3999 (`MMMM` ได้ `4000`) ส่วนเมนูจะพิมพ์คำเตือนให้ก่อนแสดงผลลัพธ์ เช่น `4 แต่ IIII ไม่ใช่รูปแบบมาตรฐาน (รูปแบบที่ถูกคือ IV)` (ฟังก์ชัน `romanWarning`)
  - เมนูรับเลขโรมันทั้งตัวพิมพ์ใหญ่และเล็ก ส่วนตัวฟังก์ชัน `romanToInt` รับตัวพิมพ์ใหญ่
- **ข้อ 5:** input เป็นจำนวนเต็มบวก ไม่เกินช่วงที่ `number` ของ JavaScript แม่นยำ (ประมาณ 15 หลัก)
- **ข้อ 6:** ผลลัพธ์ยาว `count` ตัวเสมอ (ค่าเริ่มต้นที่เกิน `count` ถูกตัดทิ้ง, `count = 0` ได้ `[]`) ถ้าค่าเริ่มต้นไม่ครบ 3 ตัว จะเติม `0` ต่อท้ายให้ครบ และนับรวมในผลลัพธ์ เช่น `([1], 5)` ได้ `[1, 0, 0, 1, 1]`

## เทสต์

ไฟล์เทสต์อยู่ในโฟลเดอร์ `test/` ใช้ [Vitest](https://vitest.dev) แต่ละไฟล์มีคอมเมนต์ด้านบนบอกว่าทดสอบกรณีไหนบ้าง ชื่อเทสต์ระบุว่าเป็น "ตัวอย่างโจทย์" หรือ "เพิ่มเอง"

```bash
npm test                              # ทุกข้อ
npx vitest run test/q03.test.ts       # เฉพาะข้อ 3
```

## โครงสร้างโปรเจกต์

```
├── README.md
├── package.json / package-lock.json
├── tsconfig.json
├── src/
│   ├── index.ts                  # เมนูโต้ตอบ (npm start)
│   ├── types.ts                  # type ของแต่ละข้อในเมนู (Question)
│   ├── q01-checkBrackets.ts
│   ├── q02-naturalSort.ts
│   ├── q03-autocomplete.ts
│   ├── q04-romanNumerals.ts
│   ├── q05-maxFromDigits.ts
│   └── q06-tribonacci.ts
└── test/
    └── q01.test.ts … q06.test.ts
```

แต่ละไฟล์ใน `src/` แยกตรรกะ (ฟังก์ชันที่ `export`) ออกจากส่วนรับ input ของเมนู (`export const qXX`) จึงเรียกใช้ฟังก์ชันตรงๆ หรือทดสอบได้โดยไม่ผ่านเมนู

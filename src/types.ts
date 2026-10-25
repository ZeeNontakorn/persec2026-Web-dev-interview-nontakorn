export interface Question {
  id: string;
  title: string;
  // คำถามที่ถามผู้ใช้ตามลำดับ
  prompts: Prompt[];
  // แปลง input (string) แล้วเรียกฟังก์ชันจริง — throw Error เพื่อแจ้ง input ผิด
  run: (inputs: string[]) => unknown;
}

export interface Prompt {
  label: string;
  // คืนข้อความ error ถ้าไม่ผ่าน, คืน undefined ถ้าผ่าน
  validate?: (value: string) => string | undefined;
}

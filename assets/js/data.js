// Problems data definition
// Edit this file to add/remove problems. Keep ids unique and URL-safe.
window.CTF_PROBLEMS = [
  {
    id: "rot13",
    title: "ROT13",
    description: "ถอดรหัสข้อความ PCkPRQG{VgfRM} ด้วย ROT13 ",
    resources: [
      { label: "ไม่มีจ้า" }
    ],
    hint: "ใช้การถอดรหัสด้วย ROT13",
    salt: "rot131313",
    answerHash: "707a5568d70a71c831ce58095f9cf9ae3ecdc3cce932b27739163f8724549302" // Use generate-hashes.html to create real hash
  },
  {
    id: "engcu",
    title: "ENG CU",
    description: "ภาพนี้ถูกถ่ายที่อาคารไหนของวิศวะจุฬา (ตอบในรูปแบบ CPxCEDT{ENG???}) เช่น ENG2 หมายถึงตึกวิศวะ2",
    resources: [
      { label: "ภาพถ่ายสุดลึกลับ", url: "assets/img/ENG.jpg" }
    ],
    hint: "ลองตรวจสอบ metadata ของภาพ",
    salt: "engcuengcu",
    answerHash: "7aef6dcd34d2b5be91bea0c7ced53756bce46d5ced4ce3a3a358473bb0878c1e" // Use generate-hashes.html to create real hash
  },
  {
    id: "web-author",
    title: "Web: Author",
    description: "Flag ซ่อนอยู่ใน html ใต้ชื่อผู้เขียนคำคม",
    resources: [
      { label: "Quote", url: "https://mularstyle.github.io/QuoteOfTheDay/" }
    ],
    hint: "ลอง Inspect หน้าเว็บ",
    salt: "webwebweb",
    answerHash: "c2dd1e9f5dbb138a9820ead799f9e762097c677776d97083ef149da89520382a" // Use generate-hashes.html to create real hash
  }
];

// Utility for solved state keys
window.ctfSolvedKey = function getSolvedKey(problemId) {
  return "ctf_solved_" + problemId;
}




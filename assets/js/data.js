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
    hint: "ใช้การถอดรหัสด้วย ROT13"
  },
  {
    id: "engcu",
    title: "ENG CU",
    description: "ภาพนี้ถูกถ่ายที่อาคารไหนของวิศวะจุฬา (ตอบในรูปแบบ CPxCEDT{ENG???})",
    resources: [
      { label: "ภาพถ่ายสุดลึกลับ", url: "../assets/img/ENG.png" }
    ],
    hint: "ลองตรวจสอบ metadata ของภาพ"
  },
  {
    id: "web-author",
    title: "Web: Author",
    description: "Flag ซ่อนอยู่ใน html ของเว็บที่ชื่อผู้เขียน",
    resources: [
      { label: "Quote", url: "https://mularstyle.github.io/QuoteOfTheDay/" }
    ],
    hint: "ลอง Inspect หน้าเว็บ"
  }
];

// Utility for solved state keys
window.ctfSolvedKey = function getSolvedKey(problemId) {
  return "ctf_solved_" + problemId;
}




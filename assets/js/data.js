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
    answerHash: "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b" // SHA-256 of normalized answer
  },
  {
    id: "engcu",
    title: "ENG CU",
    description: "ภาพนี้ถูกถ่ายที่อาคารไหนของวิศวะจุฬา (ตอบในรูปแบบ CPxCEDT{ENG???})",
    resources: [
      { label: "ภาพถ่ายสุดลึกลับ", url: "../assets/img/ENG.png" }
    ],
    hint: "ลองตรวจสอบ metadata ของภาพ",
    answerHash: "d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35" // SHA-256 of normalized answer
  },
  {
    id: "web-author",
    title: "Web: Author",
    description: "Flag ซ่อนอยู่ใน html ของเว็บที่ชื่อผู้เขียน",
    resources: [
      { label: "Quote", url: "https://mularstyle.github.io/QuoteOfTheDay/" }
    ],
    hint: "ลอง Inspect หน้าเว็บ",
    answerHash: "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a" // SHA-256 of normalized answer
  }
];

// Utility for solved state keys
window.ctfSolvedKey = function getSolvedKey(problemId) {
  return "ctf_solved_" + problemId;
}




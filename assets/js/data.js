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
    subproblems: [
      { number: 1, answer: "cpxcedt{test}" },
      { number: 2, answer: "cpxcedt{test2}" }
    ]
  },
  {
    id: "engcu",
    title: "ENG CU",
    description: "ภาพนี้ถูกถ่ายที่อาคารไหนของวิศวะจุฬา (ตอบในรูปแบบ CPxCEDT{ENG???}) เช่น ENG2 หมายถึงตึกวิศวะ2",
    resources: [
      { label: "ภาพถ่ายสุดลึกลับ", url: "assets/img/ENG.jpg" }
    ],
    hint: "ลองตรวจสอบ metadata ของภาพ metadata viewer ออนไลน์",
    subproblems: [
      { number: 1, answer: "cpxcedt{eng2}" },
      { number: 2, answer: "cpxcedt{eng4}" },
      { number: 3, answer: "cpxcedt{eng6}" },
      { number: 4, answer: "cpxcedt{eng6}" }
    ]
  },
  {
    id: "web-author",
    title: "Web: Author",
    description: "Flag ซ่อนอยู่ใน html ใต้ชื่อผู้เขียนคำคม",
    resources: [
      { label: "Quote", url: "https://mularstyle.github.io/QuoteOfTheDay/" }
    ],
    hint: "ลอง Inspect หน้าเว็บ",
    subproblems: [
      { number: 1, answer: "cpxcedt{webflag}" }
    ]
  }
];

// Utility for solved state keys
window.ctfSolvedKey = function getSolvedKey(problemId, subproblemNumber) {
  if (subproblemNumber) {
    return "ctf_solved_" + problemId + "_" + subproblemNumber;
  }
  return "ctf_solved_" + problemId;
}




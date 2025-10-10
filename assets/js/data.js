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
      {
        id: "rot13-1",
        question: "ถอดรหัสข้อความ PCkPRQG{VgfRM} ด้วย ROT13",
        answer: "CPxCEDT{Test1}"
      }
    ]
  },
  {
    id: "engcu",
    title: "ENG CU",
    description: "ภาพนี้ถูกถ่ายที่อาคารไหนของวิศวะจุฬา (ตอบในรูปแบบ CPxCEDT{ENG???}) เช่น ENG2 หมายถึงตึกวิศวะ2",
    resources: [
      { label: "ภาพถ่ายสุดลึกลับ", url: "assets/img/ENG.jpg" }
    ],
    hint: "ลองตรวจสอบ metadata ของภาพ",
    subproblems: [
      {
        id: "engcu-1",
        question: "อาคารไหนในภาพนี้?",
        answer: "CPxCEDT{ENG2}"
      },
      {
        id: "engcu-2", 
        question: "ปีที่ถ่ายภาพนี้คือ?",
        answer: "CPxCEDT{2023}"
      },
      {
        id: "engcu-3",
        question: "เวลาในการถ่ายภาพ?",
        answer: "CPxCEDT{14:30}"
      }
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
      {
        id: "web-author-1",
        question: "ชื่อผู้เขียนคำคมคืออะไร?",
        answer: "CPxCEDT{AuthorName}"
      },
      {
        id: "web-author-2",
        question: "คำคมที่ซ่อนอยู่ใน HTML คือ?",
        answer: "CPxCEDT{HiddenQuote}"
      }
    ]
  }
];

// Utility for solved state keys
window.ctfSolvedKey = function getSolvedKey(problemId) {
  return "ctf_solved_" + problemId;
}

// Debug: Log that data.js has loaded
console.log('data.js loaded successfully');
console.log('CTF_PROBLEMS count:', window.CTF_PROBLEMS ? window.CTF_PROBLEMS.length : 'undefined');
if (window.CTF_PROBLEMS && window.CTF_PROBLEMS.length > 0) {
  console.log('First problem:', window.CTF_PROBLEMS[0]);
  console.log('First problem subproblems:', window.CTF_PROBLEMS[0].subproblems);
}




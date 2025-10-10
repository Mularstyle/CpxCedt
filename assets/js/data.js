// Problems data definition
// Edit this file to add/remove problems. Keep ids unique and URL-safe.
window.CTF_PROBLEMS = [
  {
    id: "ceasar",
    title: "Ceaser Cipher",
    description: "ถอดรหัสข้อความที่ได้ด้วยหลักการของ Ceaser Cipher ",
    resources: [
      { label: "ไม่มีจ้า" }
    ],
    hint: "มีเว็บไซต์ที่ไว้ใช้ช่วยถอดรหัส Ceasar ได้",
    subproblems: [
      { number: 1, answer: "INTANIACU" },
      { number: 2, answer: "LARNGEAR" },
      { number: 3, answer: "VERYEAZYCODE" },
      { number: 4, answer: "AMAZINGLOGIC" },
      { number: 5, answer: "CROISSANT" },
      { number: 6, answer: "DECODETHIS" },
      { number: 7, answer: "GAMEOVER" },
      { number: 8, answer: "CHULAGENIE" },
      { number: 9, answer: "DECRYPTION" },
      { number: 10, answer: "RANSOMWARE" },
      { number: 11, answer: "CPANDCEDT" },
      { number: 12, answer: "MINECRAFT" },
      { number: 13, answer: "CODEISFUN" },
      { number: 14, answer: "CHARMCHURI" },
      { number: 15, answer: "VEGSALAD" },
      { number: 16, answer: "INFORMATION" },
      { number: 17, answer: "SOFTWARE" },
      { number: 18, answer: "NETWORKS" },
      { number: 19, answer: "CYBERCRIME" },
      { number: 20, answer: "CIPHERTEXT" },
      { number: 21, answer: "ILOVECOMPROG" },
      { number: 22, answer: "LETSDECODE" },
      { number: 23, answer: "THISISSECRET" },
      { number: 24, answer: "GOGOPOPBUS" },
      { number: 25, answer: "HELLOWORLD" },
      { number: 26, answer: "SUPERSECRET" },
      { number: 27, answer: "HARDWARE" },
      { number: 28, answer: "CIRCUITS" },
      { number: 29, answer: "COOLHACKER" },
      { number: 30, answer: "WHITEHAT" },
      { number: 31, answer: "CUENGINEER" },
      { number: 32, answer: "IHATEBUG" },
      { number: 33, answer: "YOUFOUNDME" },
      { number: 34, answer: "ALGORITHM" },
      { number: 35, answer: "TECHNOLOGY" },
      { number: 36, answer: "COOLPASSWORD" },
      { number: 37, answer: "PLAYROBLOX" },
      { number: 38, answer: "ARTIFICIAL" },
      { number: 39, answer: "NOPHISHING" },
      { number: 40, answer: "SECURITY" }
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




CTF Web (Static, GitHub Pages)

Overview
This is a simple, static CTF website suitable for deployment on GitHub Pages. It includes:
- Main page listing all problems with solved-state highlighting (stored in localStorage)
- Problem page with resources, hint reveal, and answer checking

Structure
- index.html: Main listing page
- problem.html: Problem detail page
- assets/css/styles.css: Styles
- assets/js/data.js: Problem definitions (includes answer hashes)
- assets/js/main.js: Logic for main page
- assets/js/problem.js: Logic for problem page
- generate-hashes.html: Utility to generate answer hashes

Local Development
Open index.html directly in your browser, or use a simple static server.

Deployment (GitHub Pages)
1) Create a new Git repository and push to GitHub.
2) In the repository settings, enable GitHub Pages for the main branch (root).
3) The site will be available at: https://<your-username>.github.io/<repo-name>/

Answer System & Subproblems
This CTF uses **plaintext answers** with **subproblem support**:
- ✅ Works on GitHub Pages (no external files needed)
- ✅ **Subproblem support** - each problem can have multiple numbered subproblems
- ✅ **Progress tracking** - individual subproblem completion is tracked
- ✅ **Main page shows progress** - displays "2/3" for partially completed problems

Adding New Problems
1) Edit assets/js/data.js to add your problem metadata
2) Define subproblems with their answers:

Example single subproblem:
{
  id: "my-problem",
  title: "My Problem",
  description: "Solve this challenge...",
  resources: [
    { label: "Hint resource", url: "https://example.com" }
  ],
  hint: "Try looking at...",
  subproblems: [
    { number: 1, answer: "cpxcedt{myflag}" }
  ]
}

Example multiple subproblems:
{
  id: "multi-problem",
  title: "Multiple Challenges",
  description: "Solve all three parts...",
  resources: [],
  hint: "Each part has different clues",
  subproblems: [
    { number: 1, answer: "cpxcedt{part1}" },
    { number: 2, answer: "cpxcedt{part2}" },
    { number: 3, answer: "cpxcedt{part3}" }
  ]
}

Notes
- Solved state is stored in localStorage by key: ctf_solved_<problemId>_<subproblemNumber>
- Answer checks are case-insensitive and trim whitespace
- Main page shows "Solved" when all subproblems are completed, or "2/3" for partial progress
- Users can select which subproblem to submit answers for via dropdown




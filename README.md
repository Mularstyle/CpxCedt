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

Answer Security & GitHub Pages
This CTF uses SHA-256 hashing for secure answer verification that works on GitHub Pages:
- ✅ Works on GitHub Pages (no external files needed)
- ✅ Answers stay secret (only hashes are visible in code)
- ✅ Still validates answers correctly

Adding New Problems
1) Edit assets/js/data.js to add your problem metadata
2) Use generate-hashes.html to create an answer hash:
   - Open generate-hashes.html in your browser
   - Enter your answer (it will be normalized: trimmed and lowercased)
   - Copy the generated hash
   - Add it as the "answerHash" property in your problem data

Example problem entry:
{
  id: "my-problem",
  title: "My Problem",
  description: "Solve this challenge...",
  resources: [
    { label: "Hint resource", url: "https://example.com" }
  ],
  hint: "Try looking at...",
  answerHash: "abc123..." // Generated hash from generate-hashes.html
}

Notes
- Solved state is stored in localStorage by key: ctf_solved_<problemId>
- Answer checks are case-insensitive and trim whitespace before hashing
- Hash verification happens entirely client-side using Web Crypto API




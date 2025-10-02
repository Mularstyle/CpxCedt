CTF Web (Static, GitHub Pages)

Overview
This is a simple, static CTF website suitable for deployment on GitHub Pages. It includes:
- Main page listing all problems with solved-state highlighting (stored in localStorage)
- Problem page with resources, hint reveal, and answer checking

Structure
- index.html: Main listing page
- problem.html: Problem detail page
- assets/css/styles.css: Styles
- assets/js/data.js: Problem definitions
- assets/js/main.js: Logic for main page
- assets/js/problem.js: Logic for problem page
 - assets/answers/answers.local.json: Local-only answers (gitignored)

Local Development
Open index.html directly in your browser, or use a simple static server.

Deployment (GitHub Pages)
1) Create a new Git repository and push to GitHub.
2) In the repository settings, enable GitHub Pages for the main branch (root).
3) The site will be available at: https://<your-username>.github.io/<repo-name>/

Customization
- Edit assets/js/data.js to add or modify problems.
- Each problem supports: id, title, description, resources, and hint. Answers are stored separately.

Notes
- Solved state is stored in localStorage by key: ctf_solved_<problemId>.
- Answer checks are case-insensitive and trim whitespace.
- Answers are loaded from assets/answers/answers.local.json (gitignored). If the file is missing (e.g., on GitHub Pages), answer checking will be disabled and you will see a message.

Local Answers Setup
1) Copy the sample file:
   - assets/answers/answers.sample.json → assets/answers/answers.local.json
2) Edit assets/answers/answers.local.json and set your real answers:
{
  "warmup-1": "flag{hello_base64}",
  "hash-me-2": "flag{ctf}",
  "web-headers-3": "flag{headers_rule}"
}

Security Note
- Do not commit the local answers file. It is ignored via .gitignore by default.




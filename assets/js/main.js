(function () {
  function isProblemSolved(problem) {
    // Check if all subproblems are solved
    if (problem.subproblems && problem.subproblems.length > 0) {
      return problem.subproblems.some(function(subproblem) {
        try {
          return localStorage.getItem(window.ctfSolvedKey(problem.id, subproblem.number)) === '1';
        } catch (_) { return false; }
      });
    }
    
    // Fallback to old format
    try {
      return localStorage.getItem(window.ctfSolvedKey(problem.id)) === '1';
    } catch (_) { return false; }
  }

  function getSolvedCount(problem) {
    if (!problem.subproblems || problem.subproblems.length === 0) {
      return isProblemSolved(problem) ? 1 : 0;
    }
    
    var solved = 0;
    problem.subproblems.forEach(function(subproblem) {
      try {
        if (localStorage.getItem(window.ctfSolvedKey(problem.id, subproblem.number)) === '1') {
          solved++;
        }
      } catch (_) {}
    });
    return solved;
  }

  function createProblemCard(problem) {
    var allSolved = isProblemSolved(problem);
    var solvedCount = getSolvedCount(problem);
    var totalCount = problem.subproblems ? problem.subproblems.length : 1;
    
    var link = document.createElement('a');
    link.href = 'problem.html?id=' + encodeURIComponent(problem.id);
    link.className = 'problem-card' + (allSolved ? ' solved' : '');

    var title = document.createElement('h3');
    title.textContent = problem.title;

    var meta = document.createElement('div');
    meta.className = 'meta';
    var badge = document.createElement('span');
    badge.className = 'badge' + (allSolved ? ' solved' : '');
    badge.textContent = allSolved ? 'Solved' : (solvedCount + '/' + totalCount);
    meta.appendChild(badge);

    link.appendChild(title);
    link.appendChild(meta);
    return link;
  }

  function renderList() {
    var listEl = document.getElementById('problems-list');
    if (!listEl || !Array.isArray(window.CTF_PROBLEMS)) return;
    listEl.innerHTML = '';
    window.CTF_PROBLEMS.forEach(function (p) {
      listEl.appendChild(createProblemCard(p));
    });
  }

  document.addEventListener('DOMContentLoaded', renderList);
})();




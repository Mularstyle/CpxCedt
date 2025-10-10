(function () {
  function isSolved(problemId) {
    try {
      var solvedSubproblems = JSON.parse(localStorage.getItem(window.ctfSolvedKey(problemId)) || '[]');
      // Check if problem has subproblems and if all are solved
      var problem = null;
      if (Array.isArray(window.CTF_PROBLEMS)) {
        for (var i = 0; i < window.CTF_PROBLEMS.length; i++) {
          if (window.CTF_PROBLEMS[i].id === problemId) {
            problem = window.CTF_PROBLEMS[i];
            break;
          }
        }
      }
      
      if (problem && problem.subproblems && problem.subproblems.length > 0) {
        // For problems with subproblems, check if all subproblems are solved
        return problem.subproblems.every(function(subproblem) {
          return solvedSubproblems.includes(subproblem.id);
        });
      } else {
        // For problems without subproblems, check if any subproblems are solved
        return solvedSubproblems.length > 0;
      }
    } catch (_) { return false; }
  }

  function createProblemCard(problem) {
    var solved = isSolved(problem.id);
    var card = document.createElement('div');
    card.className = 'problem-card' + (solved ? ' solved' : '');

    var title = document.createElement('h3');
    var link = document.createElement('a');
    link.href = 'problem.html?id=' + encodeURIComponent(problem.id);
    link.textContent = problem.title;
    title.appendChild(link);

    var meta = document.createElement('div');
    meta.className = 'meta';
    var badge = document.createElement('span');
    badge.className = 'badge' + (solved ? ' solved' : '');
    
    // Show progress for problems with subproblems
    if (problem.subproblems && problem.subproblems.length > 0) {
      try {
        var solvedSubproblems = JSON.parse(localStorage.getItem(window.ctfSolvedKey(problem.id)) || '[]');
        var solvedCount = solvedSubproblems.length;
        var totalCount = problem.subproblems.length;
        badge.textContent = solved ? 'Solved' : solvedCount + '/' + totalCount + ' solved';
      } catch (_) {
        badge.textContent = solved ? 'Solved' : 'Unsolved';
      }
    } else {
      badge.textContent = solved ? 'Solved' : 'Unsolved';
    }
    
    meta.appendChild(badge);

    card.appendChild(title);
    card.appendChild(meta);
    return card;
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




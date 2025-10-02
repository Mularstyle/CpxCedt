(function () {
  function isSolved(problemId) {
    try {
      return localStorage.getItem(window.ctfSolvedKey(problemId)) === '1';
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
    badge.textContent = solved ? 'Solved' : 'Unsolved';
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




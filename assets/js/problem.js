(function () {
  function getParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function getProblemById(id) {
    if (!Array.isArray(window.CTF_PROBLEMS)) return null;
    for (var i = 0; i < window.CTF_PROBLEMS.length; i++) {
      if (window.CTF_PROBLEMS[i].id === id) return window.CTF_PROBLEMS[i];
    }
    return null;
  }

  function normalize(str) {
    return (str || '').trim().toLowerCase();
  }

  function isSubproblemSolved(problemId, subproblemNumber) {
    try {
      return localStorage.getItem(window.ctfSolvedKey(problemId, subproblemNumber)) === '1';
    } catch (_) { return false; }
  }

  function markSubproblemSolved(problemId, subproblemNumber) {
    try { localStorage.setItem(window.ctfSolvedKey(problemId, subproblemNumber), '1'); } catch (_) {}
  }

  function clearAllSolved(problemId) {
    try {
      var problem = getProblemById(problemId);
      if (problem && problem.subproblems) {
        problem.subproblems.forEach(function(subproblem) {
          localStorage.removeItem(window.ctfSolvedKey(problemId, subproblem.number));
        });
      }
      // Also clear the old format if it exists
      localStorage.removeItem(window.ctfSolvedKey(problemId));
    } catch (_) {}
  }

  function renderProblem(problem) {
    var titleEl = document.getElementById('problem-title');
    var descEl = document.getElementById('problem-desc');
    var resEl = document.getElementById('problem-resources');
    var hintBtn = document.getElementById('hint-btn');
    var hintText = document.getElementById('hint-text');
    var subproblemSelector = document.getElementById('subproblem-selector');
    var subproblemSelect = document.getElementById('subproblem-select');

    titleEl.textContent = problem.title;
    descEl.textContent = problem.description;

    resEl.innerHTML = '';
    (problem.resources || []).forEach(function (r) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = r.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = r.label;
      li.appendChild(a);
      resEl.appendChild(li);
    });

    hintText.textContent = problem.hint || 'No hint available.';
    hintBtn.addEventListener('click', function () {
      var hidden = hintText.hasAttribute('hidden');
      if (hidden) {
        hintText.removeAttribute('hidden');
        hintBtn.textContent = 'Hide hint';
      } else {
        hintText.setAttribute('hidden', '');
        hintBtn.textContent = 'Show hint';
      }
    });

    // Setup subproblem selector when there are subproblems (show even if only 1)
    if (problem.subproblems && problem.subproblems.length >= 1) {
      subproblemSelector.style.display = 'block';
      subproblemSelect.innerHTML = '';
      var subs = problem.subproblems.slice().sort(function(a, b) { return a.number - b.number; });
      subs.forEach(function(subproblem, idx) {
        var option = document.createElement('option');
        option.value = subproblem.number;
        option.textContent = 'Subproblem ' + subproblem.number;
        if (idx === 0) option.selected = true;
        subproblemSelect.appendChild(option);
      });
    } else {
      subproblemSelector.style.display = 'none';
    }
  }

  function setupAnswerForm(problem) {
    var form = document.getElementById('answer-form');
    var input = document.getElementById('answer-input');
    var feedback = document.getElementById('answer-feedback');
    var resetBtn = document.getElementById('reset-btn');
    var subproblemSelect = document.getElementById('subproblem-select');
    var subproblemStatus = document.getElementById('subproblem-status');

    function setFeedback(ok, msg) {
      feedback.className = ok ? 'ok' : 'err';
      feedback.textContent = msg;
    }

    function updateSubproblemStatus() {
      if (!problem.subproblems || problem.subproblems.length <= 1) {
        subproblemStatus.style.display = 'none';
        return;
      }

      subproblemStatus.style.display = 'block';
      subproblemStatus.innerHTML = '<h4>Subproblem Progress:</h4>';
      
      problem.subproblems.forEach(function(subproblem) {
        var div = document.createElement('div');
        div.className = 'subproblem-item' + (isSubproblemSolved(problem.id, subproblem.number) ? ' solved' : '');
        
        var label = document.createElement('span');
        label.textContent = 'Subproblem ' + subproblem.number;
        
        var status = document.createElement('span');
        status.className = 'status';
        status.textContent = isSubproblemSolved(problem.id, subproblem.number) ? 'Solved' : 'Unsolved';
        
        div.appendChild(label);
        div.appendChild(status);
        subproblemStatus.appendChild(div);
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var user = normalize(input.value);
      
      if (!user) {
        setFeedback(false, 'Please enter an answer.');
        return;
      }
      
      if (!problem.subproblems || problem.subproblems.length === 0) {
        setFeedback(false, 'No subproblems configured for this problem.');
        return;
      }

      // Get selected subproblem (or first one if no selector)
      var selectedNumber = subproblemSelect ? parseInt(subproblemSelect.value) : problem.subproblems[0].number;
      var selectedSubproblem = problem.subproblems.find(function(sp) { return sp.number === selectedNumber; });
      
      if (!selectedSubproblem) {
        setFeedback(false, 'Invalid subproblem selected.');
        return;
      }

      var correctAnswer = normalize(selectedSubproblem.answer);
      
      if (user === correctAnswer) {
        if (isSubproblemSolved(problem.id, selectedNumber)) {
          setFeedback(true, 'Subproblem ' + selectedNumber + ' already solved!');
        } else {
          markSubproblemSolved(problem.id, selectedNumber);
          setFeedback(true, 'Correct! Subproblem ' + selectedNumber + ' marked as solved.');
          updateSubproblemStatus();
        }
      } else {
        setFeedback(false, 'Incorrect answer for subproblem ' + selectedNumber + '. Try again.');
      }
    });

    resetBtn.addEventListener('click', function () {
      clearAllSolved(problem.id);
      setFeedback(false, 'All progress cleared for this problem.');
      input.value = '';
      updateSubproblemStatus();
      input.focus();
    });

    // Initialize subproblem status display
    updateSubproblemStatus();
  }

  function init() {
    var id = getParam('id');
    var problem = getProblemById(id);
    if (!problem) {
      document.title = 'Problem not found';
      var container = document.querySelector('.container');
      container.innerHTML = '<p>Problem not found. <a href="index.html">Go back</a>.</p>';
      return;
    }
    renderProblem(problem);
    setupAnswerForm(problem);
  }

  document.addEventListener('DOMContentLoaded', init);
})();




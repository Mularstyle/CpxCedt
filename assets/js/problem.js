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

  function markSolved(problemId) {
    try { localStorage.setItem(window.ctfSolvedKey(problemId), '1'); } catch (_) {}
  }

  function clearSolved(problemId) {
    try { localStorage.removeItem(window.ctfSolvedKey(problemId)); } catch (_) {}
  }

  function renderProblem(problem) {
    var titleEl = document.getElementById('problem-title');
    var descEl = document.getElementById('problem-desc');
    var resEl = document.getElementById('problem-resources');
    var hintBtn = document.getElementById('hint-btn');
    var hintText = document.getElementById('hint-text');

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
  }

  function setupAnswerForm(problem) {
    var form = document.getElementById('answer-form');
    var input = document.getElementById('answer-input');
    var feedback = document.getElementById('answer-feedback');
    var resetBtn = document.getElementById('reset-btn');

    function setFeedback(ok, msg) {
      feedback.className = ok ? 'ok' : 'err';
      feedback.textContent = msg;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var user = normalize(input.value);
      var answers = form && form._answers ? form._answers : null;
      var ans = normalize(answers && answers[problem.id]);
      if (!ans) {
        setFeedback(false, 'Answer key not available. Configure local answers.');
        return;
      }
      if (user && ans && user === ans) {
        setFeedback(true, 'Correct! Marked as solved.');
        markSolved(problem.id);
      } else {
        setFeedback(false, 'Incorrect. Try again.');
      }
    });

    resetBtn.addEventListener('click', function () {
      clearSolved(problem.id);
      setFeedback(false, 'Progress cleared for this problem.');
      input.value = '';
      input.focus();
    });
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
    // Load local answers (gitignored). If missing, still render but checks will be disabled.
    fetch('assets/answers/answers.local.json', { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('not found'); return r.json(); })
      .then(function (json) {
        setupAnswerForm(problem);
        // Attach after form exists: set on a property read by submit handler
        var form = document.getElementById('answer-form');
        form._answers = json;
      })
      .catch(function () {
        setupAnswerForm(problem);
      });
  }

  document.addEventListener('DOMContentLoaded', init);
})();




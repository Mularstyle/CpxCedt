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

  function markSubproblemSolved(problemId, subproblemId) {
    try { 
      var solvedSubproblems = JSON.parse(localStorage.getItem(window.ctfSolvedKey(problemId)) || '[]');
      if (!solvedSubproblems.includes(subproblemId)) {
        solvedSubproblems.push(subproblemId);
        localStorage.setItem(window.ctfSolvedKey(problemId), JSON.stringify(solvedSubproblems));
      }
    } catch (_) {}
  }

  function clearSubproblemSolved(problemId, subproblemId) {
    try { 
      var solvedSubproblems = JSON.parse(localStorage.getItem(window.ctfSolvedKey(problemId)) || '[]');
      var index = solvedSubproblems.indexOf(subproblemId);
      if (index > -1) {
        solvedSubproblems.splice(index, 1);
        localStorage.setItem(window.ctfSolvedKey(problemId), JSON.stringify(solvedSubproblems));
      }
    } catch (_) {}
  }

  function isSubproblemSolved(problemId, subproblemId) {
    try { 
      var solvedSubproblems = JSON.parse(localStorage.getItem(window.ctfSolvedKey(problemId)) || '[]');
      return solvedSubproblems.includes(subproblemId);
    } catch (_) { return false; }
  }

  function clearAllSolved(problemId) {
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

    // Render subproblems
    renderSubproblems(problem);
  }

  function renderSubproblems(problem) {
    var container = document.getElementById('subproblems-container');
    var select = document.getElementById('subproblem-select');
    
    if (!container || !select) {
      console.error('Required DOM elements not found');
      return;
    }
    
    container.innerHTML = '';
    select.innerHTML = '<option value="">Select a subproblem...</option>';

    // Debug output
    console.log('Rendering subproblems for problem:', problem);
    console.log('Problem subproblems:', problem.subproblems);
    console.log('Subproblems length:', problem.subproblems ? problem.subproblems.length : 'undefined');

    if (!problem.subproblems || problem.subproblems.length === 0) {
      container.innerHTML = '<p>No subproblems available.</p>';
      console.log('No subproblems found, showing message');
      return;
    }

    problem.subproblems.forEach(function (subproblem) {
      var isSolved = isSubproblemSolved(problem.id, subproblem.id);
      
      // Create subproblem item
      var item = document.createElement('div');
      item.className = 'subproblem-item' + (isSolved ? ' solved' : '');
      item.id = 'subproblem-' + subproblem.id;
      
      var question = document.createElement('div');
      question.className = 'subproblem-question';
      question.textContent = subproblem.question;
      
      var status = document.createElement('div');
      status.className = 'subproblem-status' + (isSolved ? ' solved' : '');
      status.textContent = isSolved ? '✓ Solved' : '○ Unsolved';
      
      item.appendChild(question);
      item.appendChild(status);
      container.appendChild(item);
      
      // Add to select dropdown
      var option = document.createElement('option');
      option.value = subproblem.id;
      option.textContent = subproblem.question;
      select.appendChild(option);
    });
  }

  function setupAnswerForm(problem) {
    var form = document.getElementById('answer-form');
    var input = document.getElementById('answer-input');
    var select = document.getElementById('subproblem-select');
    var feedback = document.getElementById('answer-feedback');
    var resetBtn = document.getElementById('reset-btn');

    function setFeedback(ok, msg) {
      feedback.className = ok ? 'ok' : 'err';
      feedback.textContent = msg;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var userAnswer = normalize(input.value);
      var selectedSubproblemId = select.value;
      
      if (!selectedSubproblemId) {
        setFeedback(false, 'Please select a subproblem.');
        return;
      }
      
      if (!userAnswer) {
        setFeedback(false, 'Please enter an answer.');
        return;
      }
      
      // Find the selected subproblem
      var selectedSubproblem = null;
      if (problem.subproblems) {
        for (var i = 0; i < problem.subproblems.length; i++) {
          if (problem.subproblems[i].id === selectedSubproblemId) {
            selectedSubproblem = problem.subproblems[i];
            break;
          }
        }
      }
      
      if (!selectedSubproblem) {
        setFeedback(false, 'Selected subproblem not found.');
        return;
      }
      
      // Check if already solved
      if (isSubproblemSolved(problem.id, selectedSubproblemId)) {
        setFeedback(false, 'This subproblem is already solved.');
        return;
      }
      
      // Check answer (plaintext comparison)
      var correctAnswer = normalize(selectedSubproblem.answer);
      if (userAnswer === correctAnswer) {
        setFeedback(true, 'Correct! Subproblem marked as solved.');
        markSubproblemSolved(problem.id, selectedSubproblemId);
        // Update the UI
        updateSubproblemStatus(problem.id, selectedSubproblemId, true);
        input.value = '';
        select.value = '';
      } else {
        setFeedback(false, 'Incorrect. Try again.');
      }
    });

    resetBtn.addEventListener('click', function () {
      clearAllSolved(problem.id);
      setFeedback(false, 'All progress cleared for this problem.');
      input.value = '';
      select.value = '';
      // Update the UI
      renderSubproblems(problem);
      input.focus();
    });
  }

  function updateSubproblemStatus(problemId, subproblemId, isSolved) {
    var item = document.getElementById('subproblem-' + subproblemId);
    var status = item.querySelector('.subproblem-status');
    
    if (item && status) {
      if (isSolved) {
        item.classList.add('solved');
        status.classList.add('solved');
        status.textContent = '✓ Solved';
      } else {
        item.classList.remove('solved');
        status.classList.remove('solved');
        status.textContent = '○ Unsolved';
      }
    }
  }

  function init() {
    console.log('Initializing problem page...');
    console.log('CTF_PROBLEMS available:', window.CTF_PROBLEMS);
    
    var id = getParam('id');
    console.log('Problem ID from URL:', id);
    
    var problem = getProblemById(id);
    console.log('Found problem:', problem);
    
    if (!problem) {
      console.log('Problem not found');
      document.title = 'Problem not found';
      var container = document.querySelector('.container');
      container.innerHTML = '<p>Problem not found. <a href="index.html">Go back</a>.</p>';
      return;
    }
    
    console.log('Rendering problem:', problem.title);
    renderProblem(problem);
    setupAnswerForm(problem);
  }

  document.addEventListener('DOMContentLoaded', init);
})();




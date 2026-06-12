  (function() {
    const gate = document.getElementById('pw-gate');
    const input = document.getElementById('pw-input');
    const btn = document.getElementById('pw-btn');
    const err = document.getElementById('pw-error');
    const CORRECT = 'Greehey2026!';

    function tryPassword() {
      if (input.value === CORRECT) {
        gate.style.transition = 'opacity 0.4s ease';
        gate.style.opacity = '0';
        setTimeout(() => gate.remove(), 400);
      } else {
        err.textContent = 'Incorrect password. Please try again.';
        input.classList.remove('shake');
        void input.offsetWidth;
        input.classList.add('shake');
        input.value = '';
        setTimeout(() => input.classList.remove('shake'), 400);
      }
    }

    btn.addEventListener('click', tryPassword);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') tryPassword(); });
    input.focus();
  })();

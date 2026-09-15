/**
 * Codveda Web Development - Level 1 Task 3
 * Interactive JavaScript Dashboard & Form Validation Suite
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. THEME TOGGLE (Dark / Light Mode)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('codveda_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeButtonText(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('codveda_theme', newTheme);
      updateThemeButtonText(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode`, 'info');
    });
  }

  function updateThemeButtonText(theme) {
    if (!themeToggleBtn) return;
    themeToggleBtn.innerHTML = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  }

  // 2. CUSTOM INTERACTIVE DROPDOWN
  const dropdownTrigger = document.getElementById('dropdown-trigger');
  const dropdownMenu = document.getElementById('dropdown-menu');
  const dropdownSelectedText = document.getElementById('dropdown-selected-text');
  const dropdownResult = document.getElementById('dropdown-result');
  const dropdownItems = document.querySelectorAll('.dropdown-item');

  if (dropdownTrigger && dropdownMenu) {
    dropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdownMenu.classList.contains('show');
      dropdownTrigger.classList.toggle('active', !isOpen);
      dropdownMenu.classList.toggle('show', !isOpen);
    });

    dropdownItems.forEach(item => {
      item.addEventListener('click', () => {
        const val = item.getAttribute('data-value');
        const text = item.textContent.trim();
        
        dropdownItems.forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        dropdownSelectedText.textContent = text;
        
        dropdownMenu.classList.remove('show');
        dropdownTrigger.classList.remove('active');

        if (dropdownResult) {
          dropdownResult.style.display = 'flex';
          dropdownResult.innerHTML = `<span>✓ Selected Domain:</span> <strong>${text}</strong>`;
        }
        showToast(`Domain set to: ${text}`, 'success');
      });
    });

    document.addEventListener('click', (e) => {
      if (!dropdownTrigger.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('show');
        dropdownTrigger.classList.remove('active');
      }
    });
  }

  // 3. ACCESSIBLE MODAL DIALOG
  const openModalBtn = document.getElementById('open-modal-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');

  function openModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (openModalBtn) openModalBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('show')) {
      closeModal();
    }
  });

  // 4. INTERACTIVE STATE COUNTER
  const counterVal = document.getElementById('counter-val');
  const decBtn = document.getElementById('counter-dec');
  const incBtn = document.getElementById('counter-inc');
  const resetBtn = document.getElementById('counter-reset');
  let count = 0;

  if (counterVal && decBtn && incBtn && resetBtn) {
    const updateCounterDisplay = () => {
      counterVal.textContent = count;
      counterVal.style.color = count > 0 ? 'var(--primary)' : count < 0 ? 'var(--danger)' : 'var(--text-main)';
    };

    incBtn.addEventListener('click', () => { count++; updateCounterDisplay(); });
    decBtn.addEventListener('click', () => { count--; updateCounterDisplay(); });
    resetBtn.addEventListener('click', () => { count = 0; updateCounterDisplay(); });
  }

  // 5. COMPREHENSIVE REAL-TIME FORM VALIDATION
  const registrationForm = document.getElementById('validation-form');
  
  const fields = {
    fullname: {
      input: document.getElementById('field-name'),
      error: document.getElementById('error-name'),
      validate: (val) => {
        if (!val.trim()) return 'Full name is required.';
        if (val.trim().length < 3) return 'Name must be at least 3 characters.';
        if (!/^[a-zA-Z\s]+$/.test(val)) return 'Name must contain letters and spaces only.';
        return '';
      }
    },
    email: {
      input: document.getElementById('field-email'),
      error: document.getElementById('error-email'),
      validate: (val) => {
        if (!val.trim()) return 'Email address is required.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) return 'Please provide a valid email (e.g. name@domain.com).';
        return '';
      }
    },
    phone: {
      input: document.getElementById('field-phone'),
      error: document.getElementById('error-phone'),
      validate: (val) => {
        if (!val.trim()) return 'Phone number is required.';
        const digits = val.replace(/\D/g, '');
        if (digits.length < 10 || digits.length > 13) return 'Please enter a valid phone number (10-13 digits).';
        return '';
      }
    },
    password: {
      input: document.getElementById('field-pass'),
      error: document.getElementById('error-pass'),
      validate: (val) => {
        if (!val) return 'Password is required.';
        if (val.length < 8) return 'Password must be at least 8 characters long.';
        return '';
      }
    },
    confirmPass: {
      input: document.getElementById('field-confirm-pass'),
      error: document.getElementById('error-confirm-pass'),
      validate: (val) => {
        const passVal = fields.password.input ? fields.password.input.value : '';
        if (!val) return 'Please confirm your password.';
        if (val !== passVal) return 'Passwords do not match.';
        return '';
      }
    },
    terms: {
      input: document.getElementById('field-terms'),
      error: document.getElementById('error-terms'),
      validate: (val, input) => {
        if (!input.checked) return 'You must agree to the internship terms & guidelines.';
        return '';
      }
    }
  };

  // Password Strength Indicators
  const strengthFill = document.getElementById('strength-fill');
  const strengthLabel = document.getElementById('strength-label');
  const ruleLength = document.getElementById('rule-length');
  const ruleUpper = document.getElementById('rule-upper');
  const ruleNumber = document.getElementById('rule-number');
  const ruleSpecial = document.getElementById('rule-special');

  function evaluatePasswordStrength(password) {
    let score = 0;
    const hasLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    if (ruleLength) ruleLength.classList.toggle('valid', hasLength);
    if (ruleUpper) ruleUpper.classList.toggle('valid', hasUpper && hasLower);
    if (ruleNumber) ruleNumber.classList.toggle('valid', hasNumber);
    if (ruleSpecial) ruleSpecial.classList.toggle('valid', hasSpecial);

    if (hasLength) score++;
    if (hasUpper && hasLower) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    if (!strengthFill || !strengthLabel) return;

    if (password.length === 0) {
      strengthFill.style.width = '0%';
      strengthFill.style.backgroundColor = 'transparent';
      strengthLabel.textContent = 'None';
      strengthLabel.style.color = 'var(--text-muted)';
    } else if (score <= 1) {
      strengthFill.style.width = '25%';
      strengthFill.style.backgroundColor = 'var(--danger)';
      strengthLabel.textContent = 'Weak';
      strengthLabel.style.color = 'var(--danger)';
    } else if (score === 2) {
      strengthFill.style.width = '50%';
      strengthFill.style.backgroundColor = 'var(--warning)';
      strengthLabel.textContent = 'Fair';
      strengthLabel.style.color = 'var(--warning)';
    } else if (score === 3) {
      strengthFill.style.width = '75%';
      strengthFill.style.backgroundColor = '#38bdf8';
      strengthLabel.textContent = 'Good';
      strengthLabel.style.color = '#38bdf8';
    } else {
      strengthFill.style.width = '100%';
      strengthFill.style.backgroundColor = 'var(--success)';
      strengthLabel.textContent = 'Strong ✓';
      strengthLabel.style.color = 'var(--success)';
    }
  }

  // Attach real-time validation listeners
  Object.keys(fields).forEach(key => {
    const field = fields[key];
    if (!field.input) return;

    const runValidation = () => {
      const err = field.validate(field.input.value, field.input);
      if (err) {
        field.input.classList.add('invalid');
        field.input.classList.remove('valid');
        if (field.error) {
          field.error.textContent = err;
          field.error.classList.add('show');
        }
        return false;
      } else {
        field.input.classList.remove('invalid');
        field.input.classList.add('valid');
        if (field.error) {
          field.error.textContent = '';
          field.error.classList.remove('show');
        }
        return true;
      }
    };

    field.input.addEventListener('input', () => {
      runValidation();
      if (key === 'password') {
        evaluatePasswordStrength(field.input.value);
        if (fields.confirmPass.input.value) {
          fields.confirmPass.input.dispatchEvent(new Event('input'));
        }
      }
    });

    field.input.addEventListener('blur', runValidation);
  });

  // Form Submit Handler
  if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let allValid = true;

      Object.keys(fields).forEach(key => {
        const field = fields[key];
        const err = field.validate(field.input.value, field.input);
        if (err) {
          allValid = false;
          field.input.classList.add('invalid');
          if (field.error) {
            field.error.textContent = err;
            field.error.classList.add('show');
          }
        }
      });

      if (allValid) {
        const submitBtn = registrationForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Submitting Data...';

        setTimeout(() => {
          showToast('Form validated & submitted successfully! 🎉', 'success');
          registrationForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Register Account 🚀';

          // Reset styles
          Object.keys(fields).forEach(key => {
            fields[key].input.classList.remove('valid', 'invalid');
            if (fields[key].error) fields[key].error.classList.remove('show');
          });
          evaluatePasswordStrength('');
        }, 800);
      } else {
        showToast('Please correct highlighted validation errors.', 'error');
      }
    });
  }

  // 6. INTERACTIVE TOAST BUTTONS
  const toastSuccessBtn = document.getElementById('toast-success-btn');
  const toastErrorBtn = document.getElementById('toast-error-btn');
  const toastWarningBtn = document.getElementById('toast-warning-btn');
  const toastInfoBtn = document.getElementById('toast-info-btn');

  if (toastSuccessBtn) toastSuccessBtn.addEventListener('click', () => showToast('Operation completed successfully! ✨', 'success'));
  if (toastErrorBtn) toastErrorBtn.addEventListener('click', () => showToast('Network request encountered an error.', 'error'));
  if (toastWarningBtn) toastWarningBtn.addEventListener('click', () => showToast('Warning: Storage limit approaching 90%.', 'warning'));
  if (toastInfoBtn) toastInfoBtn.addEventListener('click', () => showToast('Latest task updates synced with cloud.', 'info'));

  // 7. INTERACTIVE TAB SWITCHER
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => { p.style.display = 'none'; p.classList.remove('active'); });

      btn.classList.add('active');
      const targetId = `panel-${btn.getAttribute('data-tab')}`;
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.style.display = 'block';
        targetPanel.classList.add('active');
      }
    });
  });

  // 8. TOAST NOTIFICATION GENERATOR
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
});

// TechPulse Insights - Interactive Scripts
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      menuBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });
  }

  // Interactive Newsletter Subscription Feedback
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterAlert = document.getElementById('newsletter-alert');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        if (newsletterAlert) {
          newsletterAlert.style.display = 'block';
          newsletterAlert.textContent = `✓ Subscribed ${emailInput.value} to weekly briefings!`;
        }
        newsletterForm.reset();
        setTimeout(() => {
          if (newsletterAlert) newsletterAlert.style.display = 'none';
        }, 4000);
      }
    });
  }
});

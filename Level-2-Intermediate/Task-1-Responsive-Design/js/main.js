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

  // Live Viewport Breakpoint Observer
  const vpWidthEl = document.getElementById('vp-width');
  const vpDeviceEl = document.getElementById('vp-device');
  const vpLayoutEl = document.getElementById('vp-layout');

  function updateViewport() {
    const width = window.innerWidth;
    if (vpWidthEl) vpWidthEl.textContent = `${width}px`;

    if (vpDeviceEl) {
      if (width < 640) {
        vpDeviceEl.textContent = '📱 Mobile Phone';
        if (vpLayoutEl) vpLayoutEl.textContent = '1-Col Stack';
      } else if (width < 1024) {
        vpDeviceEl.textContent = '📱 Tablet View';
        if (vpLayoutEl) vpLayoutEl.textContent = 'Adaptive 2-Col';
      } else {
        vpDeviceEl.textContent = '💻 Desktop Screen';
        if (vpLayoutEl) vpLayoutEl.textContent = '12-Col CSS Grid';
      }
    }
  }

  window.addEventListener('resize', updateViewport);
  updateViewport();
});


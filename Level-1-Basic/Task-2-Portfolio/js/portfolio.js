// Kiran Kakade - Portfolio Interactivity
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      toggleBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });
  }

  // Smooth Active Nav Link Spy
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Project Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === cardCategory) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById('portfolio-contact-form');
  const alertBox = document.getElementById('contact-alert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Sending Message... 🚀';
      btn.disabled = true;

      setTimeout(() => {
        if (alertBox) {
          alertBox.style.display = 'block';
          alertBox.textContent = '✓ Thank you! Your message has been sent successfully. I will connect with you soon.';
        }
        contactForm.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;

        setTimeout(() => {
          if (alertBox) alertBox.style.display = 'none';
        }, 5000);
      }, 750);
    });
  }
});

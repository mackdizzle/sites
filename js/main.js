/* ===========================
   Navigation
   =========================== */
const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Scroll shadow
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile toggle
navToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  // Animate hamburger
  navToggle.classList.toggle('open', isOpen);
});

// Close menu on link click
navMenu?.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (navMenu?.classList.contains('open') && !header.contains(e.target)) {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  }
});

/* ===========================
   Intersection Observer — fade-in on scroll
   =========================== */
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
  .fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .fade-in.visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(fadeStyle);

const observeTargets = [
  '.card', '.stat', '.testimonial', '.team__member',
  '.process__step', '.service-detail__stat-card',
  '.about-teaser__content', '.about-teaser__visual',
  '.section__header', '.contact__form-wrap', '.contact__info'
];

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(observeTargets.join(', ')).forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  observer.observe(el);
});

/* ===========================
   Contact Form Validation
   =========================== */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Clear previous errors
    contactForm.querySelectorAll('.form__error').forEach(el => el.textContent = '');
    contactForm.querySelectorAll('input, textarea').forEach(el => el.classList.remove('error'));

    // Validate first name
    const firstName = document.getElementById('firstName');
    if (!firstName.value.trim()) {
      document.getElementById('firstNameError').textContent = 'First name is required.';
      firstName.classList.add('error');
      valid = false;
    }

    // Validate last name
    const lastName = document.getElementById('lastName');
    if (!lastName.value.trim()) {
      document.getElementById('lastNameError').textContent = 'Last name is required.';
      lastName.classList.add('error');
      valid = false;
    }

    // Validate email
    const email = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      document.getElementById('emailError').textContent = 'Email address is required.';
      email.classList.add('error');
      valid = false;
    } else if (!emailPattern.test(email.value.trim())) {
      document.getElementById('emailError').textContent = 'Please enter a valid email address.';
      email.classList.add('error');
      valid = false;
    }

    // Validate message
    const message = document.getElementById('message');
    if (!message.value.trim()) {
      document.getElementById('messageError').textContent = 'Please enter a message.';
      message.classList.add('error');
      valid = false;
    }

    if (valid) {
      // Simulate submission
      const submitBtn = contactForm.querySelector('[type="submit"]');
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
      }, 800);
    }
  });

  // Live validation — clear error on input
  contactForm.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => {
      el.classList.remove('error');
      const errorEl = document.getElementById(`${el.id}Error`);
      if (errorEl) errorEl.textContent = '';
    });
  });
}

/* ===========================
   Hamburger icon toggle styles
   =========================== */
const toggleStyles = document.createElement('style');
toggleStyles.textContent = `
  .nav__toggle.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav__toggle.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .nav__toggle.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
`;
document.head.appendChild(toggleStyles);

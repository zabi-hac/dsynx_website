/**
 * DSYNZ Form handlers — contact & newsletter UI (client-side)
 */

function showStatus(el, message, isError = false) {
  if (!el) return;
  el.textContent = message;
  el.classList.toggle('text-red-400', isError);
  el.classList.toggle('text-brand', !isError);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function initNewsletterForms() {
  document.querySelectorAll('.newsletter-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const status = form.querySelector('[role="status"]');
      const email = emailInput?.value.trim();

      if (!email || !validateEmail(email)) {
        showStatus(status, 'Please enter a valid email address.', true);
        emailInput?.focus();
        return;
      }

      showStatus(status, 'Thank you. You are subscribed to DSYNZ insights.');
      form.reset();
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = document.getElementById('contact-form-status');
    const data = new FormData(form);
    const required = ['firstName', 'lastName', 'email', 'message'];
    const missing = required.filter((key) => !data.get(key)?.toString().trim());

    if (missing.length) {
      showStatus(status, 'Please complete all required fields.', true);
      return;
    }

    if (!validateEmail(data.get('email').toString())) {
      showStatus(status, 'Please enter a valid work email.', true);
      return;
    }

    showStatus(
      status,
      'Message received. Our team will respond within one business day.'
    );
    form.reset();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNewsletterForms();
  initContactForm();
});

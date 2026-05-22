import {
  renderCTA,
  renderServiceCard,
  renderCaseStudyCard,
  renderEngagementCard,
  renderFAQ,
  renderLogoMarquee,
  renderTestimonialGrid,
  renderHeroVisual,
  SERVICES,
  CASE_STUDIES,
  ENGAGEMENT_MODELS,
} from './components.js';

function initFAQ() {
  document.querySelectorAll('[data-faq-item]').forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(isOpen));
      document.querySelectorAll('[data-faq-item].is-open').forEach((other) => {
        if (other !== item) {
          other.classList.remove('is-open');
          other.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const heroVisual = document.getElementById('hero-visual-slot');
  if (heroVisual) heroVisual.innerHTML = renderHeroVisual();

  const logos = document.getElementById('client-logos');
  if (logos) logos.innerHTML = renderLogoMarquee();

  const servicesGrid = document.getElementById('services-track');
  if (servicesGrid) {
    servicesGrid.innerHTML = SERVICES.slice(0, 6).map((s, i) => renderServiceCard(s, i)).join('');
  }

  const caseGrid = document.getElementById('case-studies-grid');
  if (caseGrid) {
    caseGrid.innerHTML = CASE_STUDIES.map((p, i) => renderCaseStudyCard(p, i)).join('');
  }

  const engagementGrid = document.getElementById('engagement-grid');
  if (engagementGrid) {
    engagementGrid.innerHTML = ENGAGEMENT_MODELS.map((m, i) => renderEngagementCard(m, i)).join('');
  }

  const testimonials = document.getElementById('testimonials-grid');
  if (testimonials) testimonials.innerHTML = renderTestimonialGrid();

  const faq = document.getElementById('faq-list');
  if (faq) {
    faq.innerHTML = renderFAQ();
    initFAQ();
  }

  const cta = document.getElementById('site-cta');
  if (cta) cta.innerHTML = renderCTA();
});

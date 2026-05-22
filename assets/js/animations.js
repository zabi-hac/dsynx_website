/**
 * DSYNZ Premium motion  Lenis smooth scroll + GSAP ScrollTrigger
 */
import gsap from 'https://esm.sh/gsap@3.12.5';
import { ScrollTrigger } from 'https://esm.sh/gsap@3.12.5/ScrollTrigger';
import Lenis from 'https://esm.sh/lenis@1.1.18';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let lenis = null;

export function initSmoothScroll() {
  if (prefersReducedMotion) return null;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 1.2,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  document.documentElement.classList.add('lenis', 'lenis-smooth');
  return lenis;
}

function initRevealFallback() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

function initMagneticButtons() {
  if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) return;

  document.querySelectorAll('[data-magnetic], .btn-magnetic').forEach((btn) => {
    const strength = 0.35;
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power2.out',
      });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

function initHeroAnimations() {
  const lines = document.querySelectorAll('[data-hero-line]');
  const visual = document.querySelector('[data-hero-visual]');

  if (prefersReducedMotion) {
    lines.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (lines.length) {
    tl.from(lines, {
      y: 48,
      opacity: 0,
      duration: 1.1,
      stagger: 0.1,
      delay: 0.15,
    });
  }

  if (visual) {
    tl.from(
      visual,
      { y: 40, opacity: 0, scale: 0.96, duration: 1.2, ease: 'power3.out' },
      '-=0.7'
    );
    gsap.to(visual, {
      y: -12,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  const mesh = document.querySelector('.hero-mesh-animated');
  if (mesh) {
    gsap.to(mesh, {
      rotate: 2,
      scale: 1.04,
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }
}

function initScrollReveals() {
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    return;
  }

  gsap.utils.toArray('.reveal').forEach((el) => {
    const stagger = parseFloat(el.dataset.stagger || '0') * 0.08;
    gsap.fromTo(
      el,
      { y: 48, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

function initSectionTransitions() {
  if (prefersReducedMotion) return;

  document.querySelectorAll('[data-section]').forEach((section) => {
    const glow = section.querySelector('.section-glow');
    if (glow) {
      gsap.from(glow, {
        opacity: 0,
        scale: 0.8,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      });
    }
  });
}

function initStaggerGrids() {
  if (prefersReducedMotion) return;

  ['#services-track', '#case-studies-grid', '#engagement-grid'].forEach((selector) => {
    const grid = document.querySelector(selector);
    if (!grid) return;
    const items = grid.children;
    if (!items.length) return;

    gsap.from(items, {
      y: 56,
      opacity: 0,
      scale: 0.96,
      duration: 0.85,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: grid,
        start: 'top 82%',
      },
    });
  });
}

function initStatCounters() {
  const stats = document.querySelectorAll('[data-stat]');
  if (!stats.length) return;

  stats.forEach((stat) => {
    const target = parseInt(stat.dataset.stat, 10);
    const suffix = stat.dataset.suffix || '';
    const obj = { val: 0 };

    const update = () => {
      const v = Math.round(obj.val);
      if (suffix === 'M+') {
        stat.textContent = v + suffix;
      } else {
        stat.textContent = v + suffix;
      }
    };

    if (prefersReducedMotion) {
      obj.val = target;
      update();
      return;
    }

    gsap.to(obj, {
      val: target,
      duration: 2.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: stat, start: 'top 88%' },
      onUpdate: update,
    });
  });
}

function initTimeline() {
  const items = document.querySelectorAll('[data-timeline-item]');
  if (!items.length || prefersReducedMotion) return;

  gsap.from(items, {
    y: 40,
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '[data-process-timeline]',
      start: 'top 80%',
    },
  });
}

function initHoverElevation() {
  if (prefersReducedMotion) return;

  document.querySelectorAll('.case-card, .engagement-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -6, duration: 0.45, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.5, ease: 'power2.out' });
    });
  });
}

function initTechPills() {
  document.querySelectorAll('.tech-pill').forEach((pill, i) => {
    if (prefersReducedMotion) return;
    gsap.from(pill, {
      opacity: 0,
      y: 16,
      duration: 0.5,
      delay: i * 0.04,
      ease: 'power2.out',
      scrollTrigger: { trigger: pill, start: 'top 92%' },
    });
  });
}

export function initAnimations() {
  initRevealFallback();
  initSmoothScroll();

  try {
    initHeroAnimations();
    initScrollReveals();
    initSectionTransitions();
    initStaggerGrids();
    initStatCounters();
    initTimeline();
    initMagneticButtons();
    initHoverElevation();
    initTechPills();

    ScrollTrigger.refresh();
  } catch (e) {
    console.warn('Motion init fallback', e);
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {
    initAnimations();
  });
});

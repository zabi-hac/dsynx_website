/**
 * DSYNZ Scroll & motion  GSAP ScrollTrigger + fallbacks
 */
import gsap from 'https://esm.sh/gsap@3.12.5';
import { ScrollTrigger } from 'https://esm.sh/gsap@3.12.5/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

function initGSAPAnimations() {
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    return;
  }

  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.fromTo(
      el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  const heroTitle = document.querySelector('[data-hero-title]');
  if (heroTitle) {
    gsap.from(heroTitle.children.length ? heroTitle.children : heroTitle, {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 0.2,
    });
  }

  const stats = document.querySelectorAll('[data-stat]');
  if (stats.length) {
    stats.forEach((stat) => {
      const target = parseInt(stat.dataset.stat, 10);
      const suffix = stat.dataset.suffix || '';
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: stat, start: 'top 85%' },
        onUpdate: () => {
          stat.textContent = Math.round(obj.val) + suffix;
        },
      });
    });
  }

  const timelineItems = document.querySelectorAll('[data-timeline-item]');
  timelineItems.forEach((item, i) => {
    gsap.from(item, {
      x: i % 2 === 0 ? -30 : 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: item, start: 'top 85%' },
    });
  });
}

function initHeroGradient() {
  const mesh = document.querySelector('.hero-mesh-animated');
  if (!mesh || prefersReducedMotion) return;

  gsap.to(mesh, {
    rotate: 3,
    scale: 1.05,
    duration: 14,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
}

function initMicroInteractions() {
  document.querySelectorAll('.card-hover, .btn-primary, .btn-secondary').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (prefersReducedMotion) return;
      gsap.to(el, { scale: 1.02, duration: 0.25, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { scale: 1, duration: 0.25, ease: 'power2.out' });
    });
  });
}

export function initAnimations() {
  initRevealFallback();
  try {
    initGSAPAnimations();
    initHeroGradient();
    initMicroInteractions();
  } catch (e) {
    console.warn('GSAP unavailable, using CSS fallbacks', e);
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }
}

document.addEventListener('DOMContentLoaded', initAnimations);

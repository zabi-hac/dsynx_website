import { renderCTA, renderServiceCard, SERVICES } from './components.js';

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('services-grid');
  const cta = document.getElementById('site-cta');
  if (grid) {
    grid.innerHTML = SERVICES.slice(0, 6).map((s, i) => renderServiceCard(s, i)).join('');
  }
  if (cta) cta.innerHTML = renderCTA();
});

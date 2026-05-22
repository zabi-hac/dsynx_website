import { renderHomePage } from './sections.js';
import { initHomeInteractions } from './interactions.js';

document.addEventListener('DOMContentLoaded', () => {
  const mount = document.getElementById('home-mount');
  if (mount) mount.innerHTML = renderHomePage();
  initHomeInteractions();
});

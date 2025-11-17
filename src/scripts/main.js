// Main Entry Point - REJODA with Advanced GSAP Effects
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSmoothScroll } from './smooth-scroll.js';
import { initNavigation } from './navigation.js';
import { initHero } from './hero-animations.js';
import { initStackedCards } from './stacked-cards.js';
import { initStickyProjects } from './sticky-projects.js';
import { initZoomGrid } from './zoom-grid.js';
import { initFullscreenSlides } from './fullscreen-slides.js';
import { initScrollGrid } from './scroll-grid.js';
import { initPartners } from './partners.js';
import { initTestimonials } from './testimonials.js';
import { initAnimatedSVGs, createSVGGradients } from './animated-svgs.js';
import { initOwners } from './owners.js';
import { initCounters } from './counters.js';
import { initRevealAnimations } from './reveals.js';
import { initBackToTop } from './back-to-top.js';
import { initFormHandler } from './form-handler.js';


// Import styles
import '../styles/variables.css';
import '../styles/reset.css';
import '../styles/layout.css';
import '../styles/navigation.css';
import '../styles/hero.css';
import '../styles/buttons.css';
import '../styles/cards.css';
import '../styles/sticky-projects.css';
import '../styles/zoom-grid.css';
import '../styles/fullscreen-slides.css';
import '../styles/scroll-grid.css';
import '../styles/partners.css';
import '../styles/testimonials.css';
import '../styles/animated-svgs.css';
import '../styles/owners.css';
import '../styles/footer.css';
import '../styles/utilities.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  const lenis = initSmoothScroll();
  
  // Create SVG gradients first
  createSVGGradients();
  
  // Initialize all effects
  initNavigation();
  initHero();
  initStackedCards();
  initStickyProjects();
  initZoomGrid();
  initFullscreenSlides();
  initScrollGrid();
  initPartners();
  initTestimonials();
  initAnimatedSVGs();
  initOwners();
  initCounters();
  initRevealAnimations();
  initBackToTop(lenis);
  initFormHandler();
  
  console.log('%cREJODA Website', 'color: #3FDCE8; font-size: 20px; font-weight: bold;');
  console.log('%cPowered by Advanced GSAP Effects', 'color: #AEEB8A;');
});

// Refresh on resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
});


// Hero Section Animations
import gsap from 'gsap';

export function initHero() {
  const heroSection = document.querySelector('.hero-section');
  if (!heroSection) return;
  
  // Entrance animations
  const tl = gsap.timeline();
  tl.from('.hero-title', {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  })
  .from('.hero-subtitle', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6')
  .from('.hero-cta .btn', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: 'power3.out'
  }, '-=0.4');
  
  // Border radius animation on scroll
  gsap.to(heroSection, {
    borderRadius: '0 0 40px 40px',
    scale: 0.95,
    scrollTrigger: {
      trigger: heroSection,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    }
  });
}


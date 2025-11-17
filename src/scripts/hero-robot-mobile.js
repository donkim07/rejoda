// Hero Robot Mobile Scroll Animation
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHeroRobotMobile() {
  const robotContainer = document.getElementById('spline-robot');
  const heroContent = document.querySelector('.hero-content');
  
  if (!robotContainer || !heroContent) return;
  
  // Only setup for mobile
  const setupMobileAnimation = () => {
    // Kill existing triggers
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars && trigger.vars.trigger === heroContent) {
        trigger.kill();
      }
    });
    
    if (window.innerWidth <= 768) {
      // Show robot when hero content scrolls past
      ScrollTrigger.create({
        trigger: heroContent,
        start: 'bottom 80%',
        onEnter: () => {
          robotContainer.classList.add('scroll-visible');
        },
        onLeaveBack: () => {
          robotContainer.classList.remove('scroll-visible');
        }
      });
    } else {
      robotContainer.classList.remove('scroll-visible');
    }
  };
  
  setupMobileAnimation();
  
  // Re-setup on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setupMobileAnimation();
      ScrollTrigger.refresh();
    }, 250);
  });
}


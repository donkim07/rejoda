// Navigation Logic
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
  
  // Hide/show navbar on scroll
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      onUpdate: (self) => {
        const currentScroll = self.scroll();
        if (currentScroll > lastScroll && currentScroll > 80) {
          gsap.to(navbar, { y: -100, duration: 0.3 });
        } else {
          gsap.to(navbar, { y: 0, duration: 0.3 });
        }
        lastScroll = currentScroll;
      }
    });
  }
}


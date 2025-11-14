// Back to Top Button
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initBackToTop(lenis) {
  const button = document.getElementById('back-to-top');
  if (!button) return;
  
  gsap.set(button, { opacity: 0, scale: 0 });
  
  ScrollTrigger.create({
    start: 'top -200',
    end: 99999,
    onUpdate: (self) => {
      if (self.scroll() > 200) {
        gsap.to(button, { opacity: 1, scale: 1, duration: 0.3 });
      } else {
        gsap.to(button, { opacity: 0, scale: 0, duration: 0.3 });
      }
    }
  });
  
  button.addEventListener('click', () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}


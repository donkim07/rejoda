// Reveal Animations
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initRevealAnimations() {
  // Ensure ScrollTrigger is refreshed
  ScrollTrigger.refresh();
  
  // Fade in animations
  const fadeElements = gsap.utils.toArray('.fade-in');
  console.log(`Found ${fadeElements.length} .fade-in elements`);
  
  fadeElements.forEach((element, index) => {
    gsap.fromTo(element, {
      opacity: 0,
      y: 30
    }, {
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
        markers: false, // Set to true for debugging
        onToggle: (self) => console.log(`Fade element ${index} toggled:`, self.isActive)
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out'
    });
  });
  
  // Slide up animations
  const slideElements = gsap.utils.toArray('.slide-up');
  console.log(`Found ${slideElements.length} .slide-up elements`);
  
  slideElements.forEach((element, index) => {
    gsap.fromTo(element, {
      y: 80,
      opacity: 0
    }, {
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
        markers: false,
        onToggle: (self) => console.log(`Slide element ${index} toggled:`, self.isActive)
      },
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    });
  });
  
  // Scale in animations
  const scaleElements = gsap.utils.toArray('.scale-in');
  console.log(`Found ${scaleElements.length} .scale-in elements`);
  
  scaleElements.forEach((element, index) => {
    gsap.fromTo(element, {
      scale: 0.8,
      opacity: 0,
      y: 30
    }, {
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
        markers: false,
        onToggle: (self) => console.log(`Scale element ${index} toggled:`, self.isActive)
      },
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'back.out(1.2)'
    });
  });

  // Fallback: Immediately show any elements that might be above the viewport
  setTimeout(() => {
    const allAnimatedElements = document.querySelectorAll('.fade-in, .slide-up, .scale-in');
    allAnimatedElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInViewport) {
        // Force show elements that are in viewport but haven't animated
        gsap.set(element, { opacity: 1, y: 0, scale: 1 });
      }
    });
  }, 1000);
  
  console.log('Reveal animations initialized');
}


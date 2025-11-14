// Fullscreen Sticky Slides Effect (from stickysfullscreen.html)
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initFullscreenSlides() {
  const slides = gsap.utils.toArray('.slide');
  if (slides.length === 0) return;
  
  slides.forEach((slide, index) => {
    const heading = slide.querySelector('h2');
    const paragraph = slide.querySelector('p');
    
    // Create entrance animation for each slide
    ScrollTrigger.create({
      trigger: slide,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        slide.classList.add('in-view');
        
        // Animate heading
        if (heading) {
          gsap.fromTo(heading, {
            y: 50,
            opacity: 0
          }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out'
          });
        }
        
        // Animate paragraph with delay
        if (paragraph) {
          gsap.fromTo(paragraph, {
            y: 30,
            opacity: 0
          }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out'
          });
        }
      },
      onLeave: () => {
        slide.classList.remove('in-view');
      },
      onEnterBack: () => {
        slide.classList.add('in-view');
      },
      onLeaveBack: () => {
        slide.classList.remove('in-view');
      }
    });
    
    // Add floating animation to certain slides
    if (index % 2 === 0) {
      gsap.to(slide, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: slide,
          start: 'top bottom',
          end: 'bottom top',
          toggleActions: 'play pause resume pause'
        }
      });
    }
  });
}

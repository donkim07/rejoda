// Scroll Subgrid Animation Effect (from scrollsubgridanimation.html)
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initScrollGrid() {
  const gridLayers = gsap.utils.toArray('.grid-layer');
  const mainScaler = document.querySelector('.main-scaler');
  
  if (gridLayers.length === 0) return;
  
  // Pin the scroll content
  ScrollTrigger.create({
    trigger: '.scroll-grid-section',
    start: 'top top',
    end: 'bottom bottom',
    pin: '.scroll-content',
    pinSpacing: false
  });
  
  // Animate the main scaler (center image)
  if (mainScaler) {
    const mainImage = mainScaler.querySelector('.main-image');
    
    gsap.fromTo(mainImage, {
      width: 'calc(100vw - 4rem)',
      height: 'calc(100vh - 4rem)',
      borderRadius: '2rem'
    }, {
      width: '100%',
      height: '100%',
      borderRadius: '1rem',
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.scroll-grid-section',
        start: 'top center',
        end: 'center center',
        scrub: 1
      }
    });
  }
  
  // Animate each grid layer with different timing
  gridLayers.forEach((layer, index) => {
    const easingFunctions = ['power1.out', 'power3.out', 'power4.out'];
    const easing = easingFunctions[index] || 'power1.out';
    
    gsap.fromTo(layer, {
      opacity: 0,
      scale: 0
    }, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: easing,
      scrollTrigger: {
        trigger: '.scroll-grid-section',
        start: `top+=${100 + (index * 50)} center`,
        end: 'bottom center',
        scrub: 1
      }
    });
    
    // Add individual image animations within each layer
    const images = layer.querySelectorAll('.grid-image');
    images.forEach((image, imgIndex) => {
      gsap.fromTo(image, {
        scale: 0.8,
        opacity: 0,
        rotateY: 45
      }, {
        scale: 1,
        opacity: 1,
        rotateY: 0,
        duration: 0.8,
        delay: imgIndex * 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.scroll-grid-section',
          start: `top+=${150 + (index * 100)} center`,
          end: 'bottom center',
          toggleActions: 'play none none reverse'
        }
      });
    });
  });
}

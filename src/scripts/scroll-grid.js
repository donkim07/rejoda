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
  
  // Animate the main scaler (center image) - responsive
  if (mainScaler) {
    const mainImage = mainScaler.querySelector('.main-image');
    const isMobile = window.innerWidth <= 768;
    const padding = isMobile ? '2rem' : '4rem';
    const borderRadiusStart = isMobile ? '1rem' : '2rem';
    const borderRadiusEnd = isMobile ? '0.5rem' : '1rem';
    
    gsap.fromTo(mainImage, {
      width: `calc(100vw - ${padding})`,
      height: `calc(100vh - ${padding})`,
      borderRadius: borderRadiusStart
    }, {
      width: '100%',
      height: '100%',
      borderRadius: borderRadiusEnd,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.scroll-grid-section',
        start: 'top center',
        end: 'center center',
        scrub: 1
      }
    });
    
    // Update on resize
    window.addEventListener('resize', () => {
      const newIsMobile = window.innerWidth <= 768;
      const newPadding = newIsMobile ? '2rem' : '4rem';
      const newBorderRadiusStart = newIsMobile ? '1rem' : '2rem';
      const newBorderRadiusEnd = newIsMobile ? '0.5rem' : '1rem';
      
      ScrollTrigger.refresh();
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
        opacity: 0,
        rotateY: 45
      }, {
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

// Partners Section - Phone Screen Scroll Animation
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initPartners() {
  const partnersSection = document.querySelector('.partners-section');
  if (!partnersSection) return;
  
  const phoneFrameWrapper = document.querySelector('.phone-frame-wrapper');
  const phoneContent = document.querySelector('.phone-content');
  const phoneScreen = document.querySelector('.phone-screen-index-page');
  
  if (!phoneFrameWrapper || !phoneContent || !phoneScreen) return;
  
  // Wait for images to load before calculating heights
  const images = phoneContent.querySelectorAll('img');
  let imagesLoaded = 0;
  const totalImages = images.length;
  
  const setupAnimations = () => {
    // Calculate the total height of content and how much needs to scroll
    const screenHeight = phoneScreen.offsetHeight;
    const contentHeight = phoneContent.scrollHeight;
    const scrollableDistance = Math.max(0, contentHeight - screenHeight);
    
    // Set initial rotation (phone starts tilted)
    const initialRotation = 40; // degrees
    const isMobile = window.innerWidth <= 768;
    const rotationAmount = isMobile ? 45 : initialRotation; // Increased mobile rotation for visibility
    
    // Ensure perspective is maintained
    const scrollContainer = document.querySelector('.partners-scroll-container');
    if (scrollContainer) {
      gsap.set(scrollContainer, {
        perspective: isMobile ? 800 : 1000
      });
    }
    
    gsap.set(phoneFrameWrapper, {
      rotateX: rotationAmount,
      transformOrigin: 'center center',
      transformStyle: 'preserve-3d'
    });
    
    gsap.set(phoneContent, {
      y: 0
    });
    
    // Animate phone rotation from tilted to straight
    const rotationTween = gsap.to(phoneFrameWrapper, {
      rotateX: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: partnersSection,
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      }
    });
    
    // Animate content scrolling inside phone
    // The content should scroll up as the user scrolls down the page
    let scrollTween = null;
    if (scrollableDistance > 0) {
      scrollTween = gsap.to(phoneContent, {
        y: -scrollableDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: partnersSection,
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        }
      });
    }
    
    // Store tweens and triggers for cleanup on resize
    return { 
      rotationTween, 
      scrollTween,
      rotationTrigger: rotationTween.scrollTrigger,
      scrollTrigger: scrollTween?.scrollTrigger
    };
  };
  
  // Refresh on resize
  let resizeTimer;
  let currentTweens = null;
  
  // Handle image loading
  if (totalImages === 0) {
    // No images, setup immediately
    currentTweens = setupAnimations();
  } else {
    const imageLoadHandler = () => {
      imagesLoaded++;
      if (imagesLoaded === totalImages) {
        // All images loaded, setup animations
        setTimeout(() => {
          currentTweens = setupAnimations();
        }, 100); // Small delay to ensure layout is updated
      }
    };
    
    images.forEach(img => {
      if (img.complete) {
        imageLoadHandler();
      } else {
        img.addEventListener('load', imageLoadHandler);
        img.addEventListener('error', imageLoadHandler); // Continue even if image fails
      }
    });
  }
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Kill existing tweens and triggers
      if (currentTweens) {
        if (currentTweens.rotationTrigger) currentTweens.rotationTrigger.kill();
        if (currentTweens.scrollTrigger) currentTweens.scrollTrigger.kill();
        if (currentTweens.rotationTween) currentTweens.rotationTween.kill();
        if (currentTweens.scrollTween) currentTweens.scrollTween.kill();
      }
      
      // Refresh ScrollTrigger
      ScrollTrigger.refresh();
      
      // Recalculate and setup animations
      currentTweens = setupAnimations();
    }, 250);
  });
}


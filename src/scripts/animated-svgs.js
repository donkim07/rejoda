// Animated SVGs with GSAP
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initAnimatedSVGs() {
  // Animate SVG path drawing
  const techIcons = gsap.utils.toArray('.tech-icon path, .tech-icon circle, .tech-icon rect');
  
  techIcons.forEach(path => {
    const pathLength = path.getTotalLength ? path.getTotalLength() : 100;
    
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
      opacity: 0
    });
    
    gsap.to(path, {
      strokeDashoffset: 0,
      opacity: 1,
      duration: 2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: path.closest('.svg-container'),
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  });
  
  // Floating animation for SVGs
  gsap.utils.toArray('.floating-svg').forEach(svg => {
    gsap.to(svg, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: svg,
        start: 'top bottom',
        end: 'bottom top',
        toggleActions: 'play pause resume pause'
      }
    });
  });
  
  // Pulse animation
  gsap.utils.toArray('.pulse-svg').forEach(svg => {
    gsap.to(svg, {
      scale: 1.1,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: svg,
        start: 'top 80%',
        toggleActions: 'play pause resume pause'
      }
    });
  });
  
  // Rotate animation
  gsap.utils.toArray('.rotate-svg').forEach(svg => {
    gsap.to(svg, {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: 'none',
      scrollTrigger: {
        trigger: svg,
        start: 'top bottom',
        end: 'bottom top',
        toggleActions: 'play pause resume pause'
      }
    });
  });
  
  // Morphing SVG animation
  const morphPaths = gsap.utils.toArray('.morph-path');
  morphPaths.forEach(path => {
    const originalD = path.getAttribute('d');
    
    // Create a morphed version (this would need specific path data)
    ScrollTrigger.create({
      trigger: path.closest('.svg-container'),
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        gsap.to(path, {
          morphSVG: originalD, // This would morph to a different path
          duration: 1,
          ease: 'power2.inOut'
        });
      }
    });
  });
  
  // Color transitions for SVGs
  gsap.utils.toArray('.animated-svg').forEach(svg => {
    ScrollTrigger.create({
      trigger: svg,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(svg, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)'
        });
      },
      onLeave: () => {
        gsap.to(svg, {
          opacity: 0.3,
          scale: 0.9,
          duration: 0.5
        });
      },
      onEnterBack: () => {
        gsap.to(svg, {
          opacity: 1,
          scale: 1,
          duration: 0.5
        });
      }
    });
  });

  // Special animations for medical SVGs
  gsap.utils.toArray('.medical-svg').forEach(svg => {
    // Add interactive hover effect
    svg.addEventListener('mouseenter', () => {
      gsap.to(svg, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    svg.addEventListener('mouseleave', () => {
      gsap.to(svg, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    // Animate medical cross on scroll
    const medicalCross = svg.querySelectorAll('rect');
    medicalCross.forEach((rect, index) => {
      gsap.fromTo(rect, {
        scaleX: 0,
        scaleY: 0,
        transformOrigin: 'center'
      }, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: svg,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Animate pills
    const pills = svg.querySelectorAll('ellipse, circle[r="4"]');
    pills.forEach((pill, index) => {
      gsap.fromTo(pill, {
        scale: 0,
        rotation: -180
      }, {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        delay: 1 + (index * 0.1),
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: svg,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  });
}

// Create SVG gradients programmatically
export function createSVGGradients() {
  const svgs = document.querySelectorAll('svg');
  
  svgs.forEach(svg => {
    // Create gradient definitions
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    // Primary gradient
    const primaryGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    primaryGradient.setAttribute('id', 'gradientPrimary');
    primaryGradient.setAttribute('x1', '0%');
    primaryGradient.setAttribute('y1', '0%');
    primaryGradient.setAttribute('x2', '100%');
    primaryGradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('style', 'stop-color:#3685CA');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('style', 'stop-color:#3FDCE8');
    
    primaryGradient.appendChild(stop1);
    primaryGradient.appendChild(stop2);
    
    // Secondary gradient
    const secondaryGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    secondaryGradient.setAttribute('id', 'gradientSecondary');
    secondaryGradient.setAttribute('x1', '0%');
    secondaryGradient.setAttribute('y1', '0%');
    secondaryGradient.setAttribute('x2', '100%');
    secondaryGradient.setAttribute('y2', '100%');
    
    const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop3.setAttribute('offset', '0%');
    stop3.setAttribute('style', 'stop-color:#5AA396');
    
    const stop4 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop4.setAttribute('offset', '100%');
    stop4.setAttribute('style', 'stop-color:#AEEB8A');
    
    secondaryGradient.appendChild(stop3);
    secondaryGradient.appendChild(stop4);
    
    defs.appendChild(primaryGradient);
    defs.appendChild(secondaryGradient);
    svg.appendChild(defs);
  });
}

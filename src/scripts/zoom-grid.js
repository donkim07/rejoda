// 3D Zoom Grid Effect
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initZoomGrid() {
  const zoomSection = document.querySelector('.zoom-grid-section');
  if (!zoomSection) return;
  
  // Wait for loader to complete if it exists (overflow needs to be restored first)
  const hasLoader = document.querySelector('.page-loader');
  
  if (hasLoader) {
    // Wait for loader to complete before initializing ScrollTrigger
    const onLoaderComplete = () => {
      window.removeEventListener('loaderComplete', onLoaderComplete);
      // Initialize after overflow is restored
      requestAnimationFrame(() => {
        const zoomItems = gsap.utils.toArray('.zoom-item');
        if (zoomItems.length === 0) return;
        initZoomGridAnimations(zoomSection, zoomItems);
      });
    };
    
    window.addEventListener('loaderComplete', onLoaderComplete);
    
    // Fallback: if loader is already done
    if (!document.body.classList.contains('loader-active')) {
      requestAnimationFrame(() => {
        const zoomItems = gsap.utils.toArray('.zoom-item');
        if (zoomItems.length === 0) return;
        initZoomGridAnimations(zoomSection, zoomItems);
      });
    }
  } else {
    // No loader, initialize normally
    requestAnimationFrame(() => {
      const zoomItems = gsap.utils.toArray('.zoom-item');
      if (zoomItems.length === 0) return;
      initZoomGridAnimations(zoomSection, zoomItems);
    });
  }
}

function initZoomGridAnimations(zoomSection, zoomItems) {
  
  const isIndexPage = zoomSection.classList.contains('index-page');
  const isProjectsPage = zoomSection.classList.contains('projects');
  
  // Check if browser supports CSS scroll-linked animations
  const hasScrollSupport = CSS.supports('(animation-timeline: scroll()) and (animation-range: 0 100%)');
  
  // Special item rotation
  const specialItem = document.querySelector('.zoom-item.special');
  if (specialItem) {
    gsap.to(specialItem, {
      rotateY: 360,
      duration: isIndexPage ? 10 : 8,
      repeat: -1,
      ease: 'none'
    });
  }
  
  // If CSS scroll-linked animations are supported, we're done
  // The CSS handles everything
  if (hasScrollSupport) {
    console.log('Using CSS scroll-linked animations');
    // Refresh ScrollTrigger to ensure it recognizes the section
    ScrollTrigger.refresh();
    return;
  }
  
  // Fallback GSAP animation for browsers without scroll-linked animation support
  console.log('Using GSAP fallback animations');
  
  if (isProjectsPage) {
    // Projects page: Items zoom in and out (starts after section fully covers screen)
    const ranges = [
      { start: 0.35, end: 0.60 }, // 1
      { start: 0.47, end: 0.62 }, // 2
      { start: 0.39, end: 0.64 }, // 3
      { start: 0.41, end: 0.66 }, // 4
      { start: 0.30, end: 0.55 }, // 5 - special (starts first)
      { start: 0.43, end: 0.68 }, // 6
      { start: 0.35, end: 0.70 }, // 7
      { start: 0.47, end: 0.72 }, // 8
      { start: 0.29, end: 0.74 }, // 9
      { start: 0.51, end: 0.76 }, // 10
      { start: 0.53, end: 0.78 }, // 11
      { start: 0.35, end: 0.80 }, // 12
      { start: 0.57, end: 0.82 }, // 13
      { start: 0.59, end: 0.84 }, // 14
      { start: 0.61, end: 0.86 }, // 15
      { start: 0.63, end: 0.88 }, // 16
      { start: 0.65, end: 0.90 }, // 17
      { start: 0.47, end: 0.92 }, // 18
      { start: 0.49, end: 0.64 }, // 19
      { start: 0.71, end: 0.96 }  // 20
    ];
    
    zoomItems.forEach((item, index) => {
      const range = ranges[index] || { start: 0.3, end: 0.8 };
      
      ScrollTrigger.create({
        trigger: zoomSection,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          
          if (progress < range.start) {
            // Before animation starts
            gsap.set(item, {
              z: -2000,
              opacity: 0,
              filter: 'blur(10px)'
            });
          } else if (progress >= range.start && progress <= range.end) {
            // During animation
            const localProgress = (progress - range.start) / (range.end - range.start);
            
            if (localProgress < 0.5) {
              // First half: zoom in
              const inProgress = localProgress * 2;
              gsap.set(item, {
                z: -2000 + (inProgress * 2000),
                opacity: inProgress,
                filter: `blur(${(1 - inProgress) * 10}px)`
              });
            } else {
              // Second half: zoom out
              const outProgress = (localProgress - 0.5) * 2;
              gsap.set(item, {
                z: outProgress * 2000,
                opacity: 1 - outProgress,
                filter: `blur(${outProgress * 10}px)`
              });
            }
          } else {
            // After animation ends
            gsap.set(item, {
              z: 2000,
              opacity: 0,
              filter: 'blur(10px)'
            });
          }
        }
      });
    });
  } else if (isIndexPage) {
    // Index page: Items zoom in and stay arranged (slower timing)
    const ranges = [
      { start: 0.25, end: 0.50 }, // 1
      { start: 0.27, end: 0.52 }, // 2
      { start: 0.29, end: 0.54 }, // 3
      { start: 0.31, end: 0.56 }, // 4
      null,                        // 5 - special (no animation)
      { start: 0.33, end: 0.58 }, // 6
      { start: 0.35, end: 0.60 }, // 7
      { start: 0.37, end: 0.62 }, // 8
      { start: 0.39, end: 0.64 }, // 9
      { start: 0.41, end: 0.66 }, // 10
      { start: 0.43, end: 0.68 }  // 11
    ];
    
    zoomItems.forEach((item, index) => {
      // Skip special item
      if (item.classList.contains('special')) {
        gsap.set(item, {
          z: 0,
          opacity: 1,
          filter: 'blur(0px)'
        });
        return;
      }
      
      const range = ranges[index];
      if (!range) return;
      
      ScrollTrigger.create({
        trigger: zoomSection,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          
          if (progress < range.start) {
            // Before animation starts
            gsap.set(item, {
              z: -2000,
              opacity: 0,
              filter: 'blur(10px)'
            });
          } else if (progress >= range.start && progress <= range.end) {
            // During animation - zoom in only
            const localProgress = (progress - range.start) / (range.end - range.start);
            gsap.set(item, {
              z: -2000 + (localProgress * 2000),
              opacity: localProgress,
              filter: `blur(${(1 - localProgress) * 10}px)`
            });
          } else {
            // After animation - stay at center
            gsap.set(item, {
              z: 0,
              opacity: 1,
              filter: 'blur(0px)'
            });
          }
        }
      });
    });
  }
  
  // Refresh ScrollTrigger after creating all animations
  ScrollTrigger.refresh();
}
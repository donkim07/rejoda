// Timeline Section - Smooth scroll animations with ladder
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initTimelineSection() {
  const timelineSection = document.querySelector('.timeline-section');
  if (!timelineSection) return;

  const timelineItems = timelineSection.querySelectorAll('.timeline-item');
  const ladderMarkers = timelineSection.querySelectorAll('.ladder-marker');
  const ladderFill = timelineSection.querySelector('.ladder-fill');
  const ladderLine = timelineSection.querySelector('.ladder-line');

  if (!timelineItems.length || !ladderMarkers.length) return;

  // Calculate total height for ladder
  const totalHeight = Array.from(ladderMarkers).reduce((sum, marker) => {
    return sum + marker.offsetHeight;
  }, 0);
  
  if (ladderLine) {
    gsap.set(ladderLine, { height: totalHeight });
  }

  // Store ScrollTrigger instances for cleanup
  const scrollTriggers = [];
  
  // Animate each timeline item with smooth scroll effects
  timelineItems.forEach((item, index) => {
    const year = item.dataset.year;
    const marker = Array.from(ladderMarkers).find(m => m.dataset.year === year);
    const header = item.querySelector('.timeline-item-header');
    const body = item.querySelector('.timeline-item-body');
    const image = item.querySelector('.timeline-image');
    const text = item.querySelector('.timeline-text');
    
    if (!header || !body) return;

    // Set initial state - all items start invisible
    gsap.set(item, { opacity: 0, y: 60 });
    gsap.set([header, body], { opacity: 0 });
    if (image) gsap.set(image, { scale: 0.8, opacity: 0 });
    if (text) gsap.set(text, { x: -30, opacity: 0 });

    // Animate item entrance
    const itemTrigger = ScrollTrigger.create({
      trigger: item,
      start: 'top 80%',
      end: 'top 20%',
      onEnter: () => {
        item.classList.add('active');
        if (marker) marker.classList.add('active');
        
        // Animate item container
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        });

        // Animate header
        gsap.to(header, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.out'
        });

        // Animate body content
        gsap.to(body, {
          opacity: 1,
          duration: 0.6,
          delay: 0.4,
          ease: 'power2.out'
        });

        // Animate image
        if (image) {
          gsap.to(image, {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            delay: 0.5,
            ease: 'back.out(1.2)'
          });
        }

        // Animate text
        if (text) {
          gsap.to(text, {
            x: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.6,
            ease: 'power2.out'
          });
        }
      },
      onEnterBack: () => {
        item.classList.add('active');
        if (marker) marker.classList.add('active');
      },
      onLeave: () => {
        // Keep active state but fade slightly
        gsap.to(item, {
          opacity: 0.7,
          duration: 0.3
        });
      },
      onLeaveBack: () => {
        item.classList.remove('active');
        if (marker) marker.classList.remove('active');
        gsap.to(item, {
          opacity: 0,
          y: 60,
          duration: 0.5
        });
      }
    });
    scrollTriggers.push(itemTrigger);
    
    // Parallax effect on scroll
    const parallaxTrigger = ScrollTrigger.create({
      trigger: item,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        if (image) {
          gsap.set(image, {
            y: progress * 30,
            scale: 1 - progress * 0.1
          });
        }
      }
    });
    scrollTriggers.push(parallaxTrigger);

    // Animate ladder fill based on item progress
    const ladderTrigger = ScrollTrigger.create({
      trigger: item,
      start: 'top 80%',
      end: 'bottom 20%',
      onUpdate: (self) => {
        if (ladderFill && ladderLine) {
          const itemProgress = (index + 1) / timelineItems.length;
          const scrollProgress = self.progress;
          const fillHeight = totalHeight * (itemProgress - (1 / timelineItems.length) + (scrollProgress / timelineItems.length));
          gsap.set(ladderFill, { height: `${Math.min(fillHeight, totalHeight)}px` });
        }
      }
    });
    scrollTriggers.push(ladderTrigger);
  });

  // Animate first item on load
  if (timelineItems[0]) {
    gsap.to(timelineItems[0], {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out',
      onComplete: () => {
        const firstHeader = timelineItems[0].querySelector('.timeline-item-header');
        const firstBody = timelineItems[0].querySelector('.timeline-item-body');
        const firstImage = timelineItems[0].querySelector('.timeline-image');
        const firstText = timelineItems[0].querySelector('.timeline-text');
        
        if (firstHeader) {
          gsap.to(firstHeader, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 });
        }
        if (firstBody) {
          gsap.to(firstBody, { opacity: 1, duration: 0.6, delay: 0.4 });
        }
        if (firstImage) {
          gsap.to(firstImage, { scale: 1, opacity: 1, duration: 0.8, delay: 0.5, ease: 'back.out(1.2)' });
        }
        if (firstText) {
          gsap.to(firstText, { x: 0, opacity: 1, duration: 0.7, delay: 0.6 });
}

        timelineItems[0].classList.add('active');
        if (ladderMarkers[0]) ladderMarkers[0].classList.add('active');
      }
    });
  }

  // Cleanup function
  return () => {
    scrollTriggers.forEach(trigger => trigger.kill());
  };
}

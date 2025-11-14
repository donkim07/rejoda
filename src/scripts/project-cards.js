// Project Cards with Stacking Effect
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initProjectCards() {
  const projectCards = gsap.utils.toArray(".project-card");
  if (projectCards.length === 0) return;
  
  const lastIndex = projectCards.length - 1;
  const lastCardST = ScrollTrigger.create({
    trigger: projectCards[lastIndex],
    start: "center center"
  });
  
  projectCards.forEach((card, index) => {
    const scale = index === lastIndex ? 1 : 0.85;
    const rotation = index === lastIndex ? 0 : -2;
    
    const animation = gsap.to(card, {
      scale: scale,
      rotation: rotation,
      transformOrigin: 'center top',
    });
    
    ScrollTrigger.create({
      trigger: card,
      start: "top 15%",
      end: () => lastCardST.start,
      pin: true,
      pinSpacing: false,
      scrub: 0.5,
      animation: animation,
    });
    
    // Content reveal
    gsap.from(card.querySelectorAll('.project-info > *'), {
      scrollTrigger: {
        trigger: card,
        start: "top 50%",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out'
    });
  });
}


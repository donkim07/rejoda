// Stacked Cards Effect (from stackedcards.html example)
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initStackedCards() {
  const cards = gsap.utils.toArray(".service-card");
  if (cards.length === 0) return;
  
  const lastCardIndex = cards.length - 1;
  
  const firstCardST = ScrollTrigger.create({
    trigger: cards[0],
    start: "center center"
  });
  
  const lastCardST = ScrollTrigger.create({
    trigger: cards[lastCardIndex],
    start: "center center"
  });
  
  cards.forEach((card, index) => {
    const scale = index === lastCardIndex ? 1 : 0.9;
    const scaleDown = gsap.to(card, {
      scale: scale,
      transformOrigin: 'center bottom',
    });
    
    ScrollTrigger.create({
      trigger: card,
      start: "top 20%",
      end: () => lastCardST.start,
      pin: true,
      pinSpacing: false,
      scrub: 0.5,
      ease: "none",
      animation: scaleDown,
      toggleActions: "restart none none reverse"
    });
  });
}


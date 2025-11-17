// Hero Title Word Animation with Brand Colors
import gsap from 'gsap';

const brandColors = [
  '#3FDCE8', // accent cyan
  '#3685CA', // accent dark blue
  '#AEEB8A', // secondary green
  '#5AA396', // secondary dark teal
  '#E32755', // red accent
  '#DD2A59'  // red medical
];

export function initHeroTitleAnimation() {
  const heroTitle = document.querySelector('.hero-title');
  if (!heroTitle) return;

  const words = heroTitle.querySelectorAll('.hero-word');
  if (words.length === 0) return;

  // Set initial state - keep normal size
  gsap.set(words, {
    color: 'white',
    display: 'inline-block'
  });

  let currentIndex = 0;
  const totalWords = words.length;

  function animateNextWord() {
    const currentWord = words[currentIndex];
    const randomColor = brandColors[Math.floor(Math.random() * brandColors.length)];
    
    // Smooth animation: slightly scale up and change color, then return
    gsap.to(currentWord, {
      scale: 1.1,
      color: randomColor,
      duration: 0.5,
      ease: 'power2.out'
    });
    
    // Return to normal after a moment
    gsap.to(currentWord, {
      scale: 1,
      color: 'white',
      duration: 0.4,
      ease: 'power2.in',
      delay: 0.2
    });

    // Move to next word
    currentIndex = (currentIndex + 1) % totalWords;
  }

  // Start animation after initial entrance
  setTimeout(() => {
    // Initial animation for first word
    animateNextWord();
    
    // Continue cycling smoothly
    const interval = setInterval(() => {
      animateNextWord();
    }, 900); // Change word every 0.9 seconds for faster animation

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
      clearInterval(interval);
    });
  }, 2000); // Start after 2 seconds (after entrance animation)
}


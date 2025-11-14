// Owners Section - iPhone Mockup with Natural Phone Scrolling
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initOwners() {
  const ownersSection = document.querySelector('.owners-section');
  if (!ownersSection) return;

  const ownerImages = document.querySelectorAll('.owner-image');
  const ownerCards = document.querySelectorAll('.owner-card');
  const ownersRight = document.querySelector('.owners-right');
  
  if (ownerImages.length === 0 || ownerCards.length === 0) return;

  const totalOwners = ownerImages.length;
  let typingTimeouts = [];

  // Initialize - show first owner
  showOwner(0);

  let currentOwnerIndex = 0;
  let lastScrollPosition = 0;
  let isMobile = window.innerWidth <= 768;

  // Update isMobile on resize
  window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 768;
  });

  // Handle scroll-based owner switching with proper direction detection
  document.addEventListener('scroll', function() {
    let scrollPosition = window.scrollY;
    let ownersSection = document.querySelector('.owners-section');
    let ownersSectionTop = ownersSection.offsetTop;
    let relativeScrollPosition = scrollPosition - ownersSectionTop;
    let windowHeight = window.innerHeight + 500;
    let lastSectionIndex = totalOwners - 1;
    
    // Detect scroll direction
    const scrollingDown = scrollPosition > lastScrollPosition;
    lastScrollPosition = scrollPosition;

    // Only start switching when we're in the owners section
    if (relativeScrollPosition > 0) {
      // Calculate which owner should be active
      let targetIndex = Math.floor(relativeScrollPosition / windowHeight);
      targetIndex = Math.min(targetIndex, lastSectionIndex);
      
      // Only switch if index changed
      if (targetIndex !== currentOwnerIndex && targetIndex >= 0 && targetIndex < totalOwners) {
        const previousIndex = currentOwnerIndex;
        currentOwnerIndex = targetIndex;
        
        // Position new image BEFORE showing it based on scroll direction
        if (ownerImages[currentOwnerIndex]) {
          ownerImages[currentOwnerIndex].classList.remove('active', 'slide-out-up', 'slide-out-down');
          
          if (scrollingDown) {
            ownerImages[currentOwnerIndex].classList.add('slide-in-from-bottom');
          } else {
            ownerImages[currentOwnerIndex].classList.add('slide-in-from-top');
          }
          
          ownerImages[currentOwnerIndex].offsetHeight;
          
          setTimeout(() => {
            ownerImages[currentOwnerIndex].classList.remove('slide-in-from-bottom', 'slide-in-from-top');
            ownerImages[currentOwnerIndex].classList.add('active');
          }, 50);
        }
        
        // Handle cards and owners-right differently on mobile vs desktop
        if (isMobile) {
          // On mobile, animate the entire owners-right container
          if (ownersRight) {
            ownersRight.classList.remove('mobile-active', 'mobile-slide-out-up', 'mobile-slide-out-down');
            
            if (scrollingDown) {
              ownersRight.classList.add('mobile-slide-in-from-bottom');
            } else {
              ownersRight.classList.add('mobile-slide-in-from-top');
            }
            
            ownersRight.offsetHeight;
            
            setTimeout(() => {
              ownersRight.classList.remove('mobile-slide-in-from-bottom', 'mobile-slide-in-from-top');
              ownersRight.classList.add('mobile-active');
            }, 50);
          }
          
          // Show the correct card content (no animation, just switch content)
          ownerCards.forEach((card, i) => {
            if (i === currentOwnerIndex) {
              card.style.display = 'block';
              if (!card.classList.contains('typing')) {
                card.classList.add('typing');
                startTypingAnimation(card);
              }
            } else {
              card.style.display = 'none';
            }
          });
          
        } else {
          // Desktop: animate individual cards as before
          if (ownerCards[currentOwnerIndex]) {
            ownerCards[currentOwnerIndex].classList.remove('active', 'typing', 'slide-out-up', 'slide-out-down');
            
            if (scrollingDown) {
              ownerCards[currentOwnerIndex].classList.add('slide-in-from-bottom');
            } else {
              ownerCards[currentOwnerIndex].classList.add('slide-in-from-top');
            }
            
            ownerCards[currentOwnerIndex].offsetHeight;
            
            setTimeout(() => {
              ownerCards[currentOwnerIndex].classList.remove('slide-in-from-bottom', 'slide-in-from-top');
              ownerCards[currentOwnerIndex].classList.add('active');
              if (!ownerCards[currentOwnerIndex].classList.contains('typing')) {
                ownerCards[currentOwnerIndex].classList.add('typing');
                startTypingAnimation(ownerCards[currentOwnerIndex]);
              }
            }, 50);
          }
        }
        
        // Remove active and add appropriate exit class to previous owner
        if (ownerImages[previousIndex]) {
          ownerImages[previousIndex].classList.remove('active');
          if (scrollingDown) {
            ownerImages[previousIndex].classList.add('slide-out-up');
            if (isMobile) {
              ownerImages[previousIndex].classList.add('mobile-slow-exit');
            }
          } else {
            ownerImages[previousIndex].classList.add('slide-out-down');
            if (isMobile) {
              ownerImages[previousIndex].classList.add('mobile-slow-exit');
            }
          }
          
          setTimeout(() => {
            ownerImages[previousIndex].classList.remove('slide-out-up', 'slide-out-down', 'mobile-slow-exit');
          }, isMobile ? 1200 : 800);
        }
        
        // Handle previous owners-right exit on mobile
        if (isMobile && ownersRight) {
          ownersRight.classList.remove('mobile-active');
          if (scrollingDown) {
            ownersRight.classList.add('mobile-slide-out-up');
          } else {
            ownersRight.classList.add('mobile-slide-out-down');
          }
          
          setTimeout(() => {
            ownersRight.classList.remove('mobile-slide-out-up', 'mobile-slide-out-down');
          }, 800);
        } else if (!isMobile && ownerCards[previousIndex]) {
          // Desktop: animate previous card out
          ownerCards[previousIndex].classList.remove('active', 'typing');
          if (scrollingDown) {
            ownerCards[previousIndex].classList.add('slide-out-up');
          } else {
            ownerCards[previousIndex].classList.add('slide-out-down');
          }
          
          setTimeout(() => {
            ownerCards[previousIndex].classList.remove('slide-out-up', 'slide-out-down');
          }, 800);
        }
      }
    }
  });

  function showOwner(index) {
    clearTypingTimeouts();
    
    ownerImages.forEach((img, i) => {
      img.classList.remove('active');
    });
    
    ownerCards.forEach((card, i) => {
      card.classList.remove('active');
    });

    if (ownerImages[index]) {
      ownerImages[index].classList.add('active');
    }

    if (ownerCards[index]) {
      ownerCards[index].classList.add('active');
      startTypingAnimation(ownerCards[index]);
    }
  }

  function startTypingAnimation(card) {
    const typingElement = card.querySelector('.typing-text');
    if (!typingElement) return;

    const text = typingElement.getAttribute('data-text') || '';
    if (!text) return;

    const speed = 30;

    clearTypingTimeouts();
    typingElement.textContent = '';
    typingElement.style.setProperty('--cursor-display', 'none');

    let charIndex = 0;

    function typeCharacter() {
      if (charIndex < text.length) {
        typingElement.textContent += text.charAt(charIndex);
        charIndex++;
        
        const timeout = setTimeout(typeCharacter, speed);
        typingTimeouts.push(timeout);
      } else {
        typingElement.style.setProperty('--cursor-display', 'inline');
      }
    }

    typeCharacter();
  }

  function clearTypingTimeouts() {
    typingTimeouts.forEach(timeout => clearTimeout(timeout));
    typingTimeouts = [];
  }

  window.addEventListener('beforeunload', clearTypingTimeouts);
}
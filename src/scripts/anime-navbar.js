// Anime Navbar - Vanilla JS implementation
import gsap from 'gsap';

export function initAnimeNavbar() {
  const navbar = document.querySelector('.anime-navbar');
  if (!navbar) return;

  const navItems = navbar.querySelectorAll('.anime-nav-item');
  let activeTab = getActiveTab();
  let hoveredTab = null;

  // Set initial active state based on current page
  const currentPath = window.location.pathname;
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href && (currentPath.includes(href) || (currentPath === '/' && href === 'index.html'))) {
      item.classList.add('active');
      activeTab = item.dataset.tab || item.textContent.trim();
    } else {
      item.classList.remove('active');
    }
  });

  updateActiveState(activeTab);

  navItems.forEach(item => {
    const link = item.closest('a');
    const tabName = item.dataset.tab || item.textContent.trim();

    // Click handler
    item.addEventListener('click', (e) => {
      if (link && link.getAttribute('href') !== '#') {
        // Allow navigation
        return;
      }
      e.preventDefault();
      setActiveTab(tabName);
    });

    // Hover handlers
    item.addEventListener('mouseenter', () => {
      hoveredTab = tabName;
      if (activeTab === tabName) {
        animateMascotHover();
      }
    });

    item.addEventListener('mouseleave', () => {
      hoveredTab = null;
      if (activeTab === tabName) {
        animateMascotIdle();
      }
    });
  });
}

function getActiveTab() {
  const activeItem = document.querySelector('.anime-nav-item.active');
  if (activeItem) {
    return activeItem.dataset.tab || activeItem.textContent.trim();
  }
  return 'Home';
}

function setActiveTab(tabName) {
  const navbar = document.querySelector('.anime-navbar');
  const navItems = navbar.querySelectorAll('.anime-nav-item');
  
  navItems.forEach(item => {
    const itemTab = item.dataset.tab || item.textContent.trim();
    if (itemTab === tabName) {
      item.classList.add('active');
      createMascot(item);
    } else {
      item.classList.remove('active');
    }
  });
  
  updateActiveState(tabName);
}

function updateActiveState(tabName) {
  const navbar = document.querySelector('.anime-navbar');
  const activeItem = navbar.querySelector('.anime-nav-item.active');
  
  if (!activeItem) return;

  // Remove existing mascot
  const existingMascot = navbar.querySelector('.anime-mascot');
  if (existingMascot) {
    existingMascot.remove();
  }

  // Create mascot
  createMascot(activeItem);
  
  // Add mouse interaction to mascot
  setupMascotMouseInteraction(activeItem);
}

function createMascot(parentItem) {
  const navbar = document.querySelector('.anime-navbar');
  
  // Remove existing mascot
  const existingMascot = navbar.querySelector('.anime-mascot');
  if (existingMascot) {
    existingMascot.remove();
  }

  const mascot = document.createElement('div');
  mascot.className = 'anime-mascot';
  
  const circle = document.createElement('div');
  circle.className = 'anime-mascot-circle';
  
  const eyeLeft = document.createElement('div');
  eyeLeft.className = 'anime-mascot-eye left';
  
  const eyeRight = document.createElement('div');
  eyeRight.className = 'anime-mascot-eye right';
  
  const mouth = document.createElement('div');
  mouth.className = 'anime-mascot-mouth';
  
  circle.appendChild(eyeLeft);
  circle.appendChild(eyeRight);
  circle.appendChild(mouth);
  mascot.appendChild(circle);
  
  parentItem.style.position = 'relative';
  parentItem.appendChild(mascot);
  
  animateMascotIdle();
}

function animateMascotHover() {
  const mascot = document.querySelector('.anime-mascot-circle');
  if (!mascot) return;
  
  gsap.to(mascot, {
    scale: 1.1,
    rotate: -5,
    duration: 0.5,
    ease: 'power2.out',
    yoyo: true,
    repeat: 1
  });
  
  const eyes = document.querySelectorAll('.anime-mascot-eye');
  eyes.forEach(eye => {
    gsap.to(eye, {
      scaleY: 0.2,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    });
  });
}

function animateMascotIdle() {
  const mascot = document.querySelector('.anime-mascot-circle');
  if (!mascot) return;
  
  gsap.to(mascot, {
    y: 0,
    duration: 2,
    ease: 'power2.inOut',
    repeat: -1,
    yoyo: true
  });
}

function setupMascotMouseInteraction(parentItem) {
  const mascot = parentItem.querySelector('.anime-mascot');
  if (!mascot) return;
  
  const navbar = document.querySelector('.anime-navbar-container');
  if (!navbar) return;
  
  const mascotCircle = mascot.querySelector('.anime-mascot-circle');
  if (!mascotCircle) return;
  
  // Track mouse position relative to navbar
  navbar.addEventListener('mousemove', (e) => {
    const rect = navbar.getBoundingClientRect();
    const activeItemRect = parentItem.getBoundingClientRect();
    const centerX = activeItemRect.left + activeItemRect.width / 2;
    const centerY = activeItemRect.top + activeItemRect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 150;
    
    if (distance < maxDistance) {
      const intensity = Math.min(1, 1 - (distance / maxDistance));
      const eyeOffsetX = deltaX * 0.08 * intensity;
      const eyeOffsetY = deltaY * 0.08 * intensity;
      
      const eyeLeft = mascot.querySelector('.anime-mascot-eye.left');
      const eyeRight = mascot.querySelector('.anime-mascot-eye.right');
      
      if (eyeLeft) {
        gsap.to(eyeLeft, {
          x: eyeOffsetX,
          y: eyeOffsetY,
          duration: 0.2,
          ease: 'power2.out'
        });
      }
      
      if (eyeRight) {
        gsap.to(eyeRight, {
          x: eyeOffsetX,
          y: eyeOffsetY,
          duration: 0.2,
          ease: 'power2.out'
        });
      }
      
      // Rotate mascot slightly towards mouse
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      gsap.to(mascotCircle, {
        rotation: angle * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  });
  
  navbar.addEventListener('mouseleave', () => {
    const eyeLeft = mascot.querySelector('.anime-mascot-eye.left');
    const eyeRight = mascot.querySelector('.anime-mascot-eye.right');
    
    if (eyeLeft) {
      gsap.to(eyeLeft, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    
    if (eyeRight) {
      gsap.to(eyeRight, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    
    gsap.to(mascotCircle, {
      rotation: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
}


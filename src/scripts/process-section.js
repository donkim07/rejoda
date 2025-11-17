// Process Section - Radial Orbital Timeline
import gsap from 'gsap';

export function initProcessSection() {
  const processSection = document.querySelector('.process-section');
  if (!processSection) return;

  const processItems = processSection.querySelectorAll('.process-item');
  let activeItem = null;
  let rotationAngle = 0;
  let autoRotate = true;

  // Hide all cards initially
  processItems.forEach(item => {
    const card = item.querySelector('.process-card');
    if (card) {
      card.style.display = 'none';
      card.style.visibility = 'hidden';
      gsap.set(card, { opacity: 0, scale: 0.8, y: -20 });
    }
  });

  // Click handler
  processItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleItem(item, index);
    });
  });

  // Container click to reset
  const wrapper = processSection.querySelector('.orbital-timeline-wrapper');
  if (wrapper) {
    wrapper.addEventListener('click', (e) => {
      if (e.target === wrapper || e.target.classList.contains('orbital-center')) {
        resetView();
      }
    });
  }

  // Auto-rotate
  let rotationInterval;
  function startAutoRotate() {
    if (rotationInterval) clearInterval(rotationInterval);
    rotationInterval = setInterval(() => {
      if (autoRotate) {
        rotationAngle = (rotationAngle + 0.3) % 360;
        updatePositions();
      }
    }, 50);
  }

  function updatePositions() {
    const wrapper = processSection.querySelector('.orbital-timeline-wrapper');
    if (!wrapper) return;
    
    const isMobile = window.innerWidth < 768;
    const isSmallMobile = window.innerWidth < 480;
    const radius = isSmallMobile ? 120 : isMobile ? 140 : 200;
    
    processItems.forEach((item, index) => {
      const total = processItems.length;
      const angle = ((index / total) * 360 + rotationAngle) % 360;
      const radian = (angle * Math.PI) / 180;
      
      const x = radius * Math.cos(radian);
      const y = radius * Math.sin(radian);
      
      if (autoRotate) {
        gsap.to(item, {
          x: x,
          y: y,
          duration: 0.7,
          ease: 'power2.out',
          transformOrigin: 'center center'
        });
      } else {
        gsap.set(item, {
          x: x,
          y: y,
          transformOrigin: 'center center'
        });
      }
    });
  }
  
  // Update on resize
  window.addEventListener('resize', () => {
    updatePositions();
  });

  function toggleItem(item, index) {
    const wasActive = item.classList.contains('active');
    
    // Remove active from all with smooth animation
    processItems.forEach(i => {
      const card = i.querySelector('.process-card');
      if (card && i.classList.contains('active')) {
        gsap.to(card, { 
          opacity: 0, 
          scale: 0.8,
          y: -20,
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => {
            i.classList.remove('active');
            card.style.display = 'none';
            card.style.visibility = 'hidden';
          }
        });
      } else {
        i.classList.remove('active');
        const card = i.querySelector('.process-card');
        if (card) {
          card.style.display = 'none';
          card.style.visibility = 'hidden';
        }
      }
    });
    
    // If clicking the same item, just close it
    if (wasActive) {
      activeItem = null;
      autoRotate = true;
      startAutoRotate();
      return;
    }
    
    // Add active to clicked with smooth animation
    item.classList.add('active');
    activeItem = item;
    autoRotate = false;
    
    // Show card with smooth elegant animation
    const card = item.querySelector('.process-card');
    if (card) {
      // Set display and visibility first
      card.style.display = 'block';
      card.style.visibility = 'visible';
      
      gsap.fromTo(card, 
        { 
          opacity: 0, 
          scale: 0.8,
          y: -20
        },
        { 
          opacity: 1, 
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.15
        }
      );
    }
    
    // Center view on item smoothly
    const total = processItems.length;
    const targetAngle = (index / total) * 360;
    const currentAngle = rotationAngle;
    const diff = ((targetAngle - (270 - currentAngle)) % 360 + 360) % 360;
    const shortestPath = diff > 180 ? diff - 360 : diff;
    
    gsap.to({ value: rotationAngle }, {
      value: 270 - targetAngle,
      duration: 0.8,
      ease: 'power2.inOut',
      onUpdate: function() {
        rotationAngle = this.targets()[0].value;
        updatePositions();
      }
    });
    
    // Pulse related items
    pulseItem(item);
  }

  function pulseItem(item) {
    gsap.to(item.querySelector('.process-node'), {
      scale: 1.2,
      duration: 0.3,
      yoyo: true,
      repeat: 1
    });
  }

  function resetView() {
    processItems.forEach(item => {
      const card = item.querySelector('.process-card');
      if (card && item.classList.contains('active')) {
        gsap.to(card, { 
          opacity: 0, 
          scale: 0.8,
          y: -20,
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => {
            item.classList.remove('active');
            card.style.display = 'none';
            card.style.visibility = 'hidden';
          }
        });
      } else {
        item.classList.remove('active');
        const card = item.querySelector('.process-card');
        if (card) {
          card.style.display = 'none';
          card.style.visibility = 'hidden';
        }
      }
    });
    activeItem = null;
    autoRotate = true;
    startAutoRotate();
  }

  // Initialize
  startAutoRotate();
  updatePositions();
}


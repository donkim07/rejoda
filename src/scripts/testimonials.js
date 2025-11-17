// Testimonials Section - 3D Sphere with Testimonials
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Testimonial data
const TESTIMONIALS_DATA = [
  {
    id: 'testimonial-1',
    src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=400&fit=crop',
    alt: 'Digital Infrastructure',
    text: 'Rejoda transformed our digital infrastructure with their innovative IT solutions. The government website network they built for us has streamlined our operations and improved citizen engagement significantly.',
    authorName: 'Dr. Ahmed Hassan',
    authorTitle: 'Regional Commissioner, Pemba',
    division: 'IT & Digital Solutions'
  },
  {
    id: 'testimonial-2',
    src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop',
    alt: 'Medical Equipment',
    text: 'SKS Pharma Ltd\'s platform has revolutionized how we source medical equipment. The seamless online ordering system and reliable delivery have made our healthcare operations more efficient than ever.',
    authorName: 'Dr. Fatuma Mwinyi',
    authorTitle: 'Hospital Administrator, Dar es Salaam',
    division: 'Medical & Pharmaceuticals'
  },
  {
    id: 'testimonial-3',
    src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=400&fit=crop',
    alt: 'Warehouse Storage',
    text: 'Their warehousing and logistics solutions have been a game-changer for our business. The digital inventory tracking system ensures we never run out of stock, and their security integration gives us complete peace of mind.',
    authorName: 'James Mwangi',
    authorTitle: 'Operations Manager, Nairobi',
    division: 'Warehousing & Logistics'
  },
  {
    id: 'testimonial-4',
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop',
    alt: 'Urban Development',
    text: 'The waste management portal and mobile app developed by Rejoda have transformed how we handle urban waste collection. Real-time reporting and efficient routing have improved our service delivery dramatically.',
    authorName: 'Sarah Komba',
    authorTitle: 'City Director, Mwanza',
    division: 'IT & Digital Solutions'
  },
  {
    id: 'testimonial-5',
    src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop',
    alt: 'Pharmaceutical Distribution',
    text: 'Working with Rejoda\'s pharmaceutical division has been exceptional. Their comprehensive product range and reliable distribution network ensure we always have the medical supplies we need when we need them.',
    authorName: 'Dr. Peter Kimathi',
    authorTitle: 'Chief Pharmacist, Arusha',
    division: 'Medical & Pharmaceuticals'
  },
  {
    id: 'testimonial-6',
    src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop',
    alt: 'Cloud Technology',
    text: 'Rejoda\'s cloud deployment and cybersecurity consulting services have significantly enhanced our data security. Their expertise in modern technology solutions has positioned us as a leader in digital innovation.',
    authorName: 'Michael Ochieng',
    authorTitle: 'IT Director, Kampala',
    division: 'IT & Digital Solutions'
  },
  {
    id: 'testimonial-7',
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop',
    alt: 'Mobile Applications',
    text: 'The mobile applications developed by Rejoda have transformed how we interact with our customers. Their Android and iOS apps are intuitive, reliable, and have significantly improved our service delivery.',
    authorName: 'Amina Juma',
    authorTitle: 'CEO, Tech Solutions Ltd',
    division: 'IT & Digital Solutions'
  },
  {
    id: 'testimonial-8',
    src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
    alt: 'Medical Supplies',
    text: 'Rejoda\'s pharmaceutical distribution network is unmatched. They ensure timely delivery of critical medical supplies, which has been crucial for our operations in remote areas.',
    authorName: 'Dr. John Mwangi',
    authorTitle: 'Medical Director, Rural Clinic',
    division: 'Medical & Pharmaceuticals'
  },
  {
    id: 'testimonial-9',
    src: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop',
    alt: 'Logistics Operations',
    text: 'The logistics support from Rejoda has streamlined our supply chain operations. Their modern warehousing facilities and digital tracking systems have reduced our operational costs significantly.',
    authorName: 'Robert Kipchoge',
    authorTitle: 'Supply Chain Manager',
    division: 'Warehousing & Logistics'
  }
];

// Use only unique testimonials (no duplication)
const generateTestimonials = () => {
  const testimonials = [];
  for (let i = 0; i < 30; i++) {
    const baseIndex = i % TESTIMONIALS_DATA.length;
    const base = TESTIMONIALS_DATA[baseIndex];
    testimonials.push({
      ...base,
      id: `${base.id}-${Math.floor(i / TESTIMONIALS_DATA.length)}`
    });
  }
  return testimonials;
};

// Math utilities
const SPHERE_MATH = {
  degreesToRadians: (degrees) => degrees * (Math.PI / 180),
  radiansToDegrees: (radians) => radians * (180 / Math.PI),
  normalizeAngle: (angle) => {
    while (angle > 180) angle -= 360;
    while (angle < -180) angle += 360;
    return angle;
  }
};

export function initTestimonials() {
  const sphereContainer = document.getElementById('testimonials-sphere');
  const modal = document.getElementById('testimonial-modal');
  const modalClose = document.getElementById('testimonial-modal-close');
  
  if (!sphereContainer) return;
  
  // Configuration
  const config = {
    containerSize: Math.min(1000, window.innerWidth * 0.85),
    sphereRadius: 270,
    dragSensitivity: 0.8,
    momentumDecay: 0.96,
    maxRotationSpeed: 6,
    baseImageScale: 0.13,
    hoverScale: 1.3,
    perspective: 1000,
    autoRotate: true,
    autoRotateSpeed: 0.2
  };
  
  // Adjust for mobile
  if (window.innerWidth <= 768) {
    config.containerSize = Math.min(600, window.innerWidth * 0.92);
    config.sphereRadius = 180;
    config.baseImageScale = 0.12;
  }
  
  const testimonials = generateTestimonials();
  const actualSphereRadius = config.sphereRadius;
  let baseImageSize = config.containerSize * config.baseImageScale;
  
  // State
  let rotation = { x: 15, y: 15, z: 0 };
  let velocity = { x: 0, y: 0 };
  let isDragging = false;
  let hasDragged = false;
  let dragStartPos = { x: 0, y: 0 };
  let hoveredIndex = null;
  let selectedTestimonial = null;
  let lastMousePos = { x: 0, y: 0 };
  let animationFrameId = null;
  let imagePositions = [];
  
  // Generate sphere positions using Fibonacci distribution
  const generateSpherePositions = () => {
    const positions = [];
    const imageCount = testimonials.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = 2 * Math.PI / goldenRatio;
    
    for (let i = 0; i < imageCount; i++) {
      const t = i / imageCount;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;
      
      let phi = inclination * (180 / Math.PI);
      let theta = (azimuth * (180 / Math.PI)) % 360;
      
      // Better pole coverage
      const poleBonus = Math.pow(Math.abs(phi - 90) / 90, 0.6) * 35;
      if (phi < 90) {
        phi = Math.max(5, phi - poleBonus);
      } else {
        phi = Math.min(175, phi + poleBonus);
      }
      
      phi = 15 + (phi / 180) * 150;
      
      // Add slight randomization
      const randomOffset = (Math.random() - 0.5) * 20;
      theta = (theta + randomOffset) % 360;
      phi = Math.max(0, Math.min(180, phi + (Math.random() - 0.5) * 10));
      
      positions.push({ theta, phi, radius: actualSphereRadius });
    }
    
    return positions;
  };
  
  // Calculate world positions with rotation
  const calculateWorldPositions = () => {
    const positions = imagePositions.map((pos, index) => {
      const thetaRad = SPHERE_MATH.degreesToRadians(pos.theta);
      const phiRad = SPHERE_MATH.degreesToRadians(pos.phi);
      const rotXRad = SPHERE_MATH.degreesToRadians(rotation.x);
      const rotYRad = SPHERE_MATH.degreesToRadians(rotation.y);
      
      // Initial position on sphere
      let x = pos.radius * Math.sin(phiRad) * Math.cos(thetaRad);
      let y = pos.radius * Math.cos(phiRad);
      let z = pos.radius * Math.sin(phiRad) * Math.sin(thetaRad);
      
      // Apply Y-axis rotation (horizontal drag)
      const x1 = x * Math.cos(rotYRad) + z * Math.sin(rotYRad);
      const z1 = -x * Math.sin(rotYRad) + z * Math.cos(rotYRad);
      x = x1;
      z = z1;
      
      // Apply X-axis rotation (vertical drag)
      const y2 = y * Math.cos(rotXRad) - z * Math.sin(rotXRad);
      const z2 = y * Math.sin(rotXRad) + z * Math.cos(rotXRad);
      y = y2;
      z = z2;
      
      const worldPos = { x, y, z };
      
      // Calculate visibility
      const fadeZoneStart = -10;
      const fadeZoneEnd = -30;
      const isVisible = worldPos.z > fadeZoneEnd;
      
      let fadeOpacity = 1;
      if (worldPos.z <= fadeZoneStart) {
        fadeOpacity = Math.max(0, (worldPos.z - fadeZoneEnd) / (fadeZoneStart - fadeZoneEnd));
      }
      
      // Calculate scale
      const distanceFromCenter = Math.sqrt(worldPos.x * worldPos.x + worldPos.y * worldPos.y);
      const maxDistance = actualSphereRadius;
      const distanceRatio = Math.min(distanceFromCenter / maxDistance, 1);
      const centerScale = Math.max(0.3, 1 - distanceRatio * 0.7);
      const depthScale = (worldPos.z + actualSphereRadius) / (2 * actualSphereRadius);
      const scale = centerScale * Math.max(0.5, 0.8 + depthScale * 0.3);
      
      return {
        ...worldPos,
        scale,
        zIndex: Math.round(1000 + worldPos.z),
        isVisible,
        fadeOpacity,
        originalIndex: index
      };
    });
    
    return positions;
  };
  
  // Clamp rotation speed
  const clampRotationSpeed = (speed) => {
    return Math.max(-config.maxRotationSpeed, Math.min(config.maxRotationSpeed, speed));
  };
  
  // Update momentum and rotation
  const updateMomentum = () => {
    if (isDragging) return;
    
    velocity.x *= config.momentumDecay;
    velocity.y *= config.momentumDecay;
    
    if (!config.autoRotate && Math.abs(velocity.x) < 0.01 && Math.abs(velocity.y) < 0.01) {
      velocity.x = 0;
      velocity.y = 0;
    }
    
    let newY = rotation.y;
    if (config.autoRotate) {
      newY += config.autoRotateSpeed;
    }
    newY += clampRotationSpeed(velocity.y);
    
    rotation.x = SPHERE_MATH.normalizeAngle(rotation.x + clampRotationSpeed(velocity.x));
    rotation.y = SPHERE_MATH.normalizeAngle(newY);
  };
  
  // Render images with throttling and position caching to prevent flickering
  let lastRenderTime = 0;
  const renderThrottle = 16; // ~60fps
  let cachedElements = new Map();
  let isFirstRender = true;
  
  const renderImages = () => {
    const now = performance.now();
    if (now - lastRenderTime < renderThrottle && !isFirstRender) {
      return;
    }
    lastRenderTime = now;
    isFirstRender = false;
    
    const worldPositions = calculateWorldPositions();
    
    // Update existing elements or create new ones
    worldPositions.forEach((position, index) => {
      if (!position.isVisible) {
        // Remove if exists
        const existing = cachedElements.get(position.originalIndex);
        if (existing) {
          existing.remove();
          cachedElements.delete(position.originalIndex);
        }
        return;
      }
      
      const testimonial = testimonials[position.originalIndex];
      const imageSize = baseImageSize * position.scale;
      const isHovered = hoveredIndex === position.originalIndex;
      const finalScale = isHovered ? Math.min(1.2, 1.2 / position.scale) : 1;
      
      let imgElement = cachedElements.get(position.originalIndex);
      
      if (!imgElement) {
        // Create new element
        imgElement = document.createElement('div');
        imgElement.className = 'sphere-image';
        imgElement.dataset.testimonialIndex = position.originalIndex;
        
        imgElement.innerHTML = `
          <div class="sphere-image-wrapper">
            <img src="${testimonial.src}" alt="${testimonial.alt}" loading="${index < 3 ? 'eager' : 'lazy'}" draggable="false">
          </div>
        `;
        
        // Add event listeners only once
        imgElement.addEventListener('mouseenter', (e) => {
          e.stopPropagation();
          hoveredIndex = position.originalIndex;
        });
        
        imgElement.addEventListener('mouseleave', (e) => {
          e.stopPropagation();
          hoveredIndex = null;
        });
        
        // Simple click handler
        const handleImageClick = (e) => {
          e.stopPropagation();
          selectedTestimonial = testimonial;
          showModal();
        };
        
        imgElement.addEventListener('click', handleImageClick, false);
        
        // Prevent container drag
        imgElement.addEventListener('mousedown', (e) => {
          e.stopPropagation();
        }, true);
        
        // Touch handlers
        let touchStartTime = 0;
        imgElement.addEventListener('touchstart', (e) => {
          touchStartTime = Date.now();
        });
        
        imgElement.addEventListener('touchend', (e) => {
          e.stopPropagation();
          const touchDuration = Date.now() - touchStartTime;
          if (touchDuration < 300 && !isDragging) {
            e.preventDefault();
            selectedTestimonial = testimonial;
            showModal();
          }
        });
        
        sphereContainer.appendChild(imgElement);
        cachedElements.set(position.originalIndex, imgElement);
      }
      
      // Update position and style
      imgElement.style.cssText = `
        position: absolute;
        width: ${imageSize}px;
        height: ${imageSize}px;
        left: ${config.containerSize / 2 + position.x}px;
        top: ${config.containerSize / 2 + position.y}px;
        opacity: ${position.fadeOpacity};
        transform: translate(-50%, -50%) scale(${finalScale});
        z-index: ${position.zIndex};
        cursor: pointer;
        pointer-events: auto;
        will-change: transform, opacity;
      `;
    });
    
    // Remove elements that are no longer visible
    cachedElements.forEach((element, index) => {
      const stillVisible = worldPositions.some(p => p.originalIndex === index && p.isVisible);
      if (!stillVisible) {
        element.remove();
        cachedElements.delete(index);
      }
    });
  };
  
  // Animation loop
  const animate = () => {
    updateMomentum();
    renderImages();
    animationFrameId = requestAnimationFrame(animate);
  };
  
  // Event handlers
  const handleMouseDown = (e) => {
    // Don't start dragging if clicking on an image or its children
    const clickedImage = e.target.closest('.sphere-image');
    if (clickedImage) {
      // Let the image handle its own click
      return;
    }
    // Only prevent default and start dragging if clicking on container background
    e.preventDefault();
    isDragging = true;
    hasDragged = false;
    velocity = { x: 0, y: 0 };
    lastMousePos = { x: e.clientX, y: e.clientY };
    dragStartPos = { x: e.clientX, y: e.clientY };
    updateCursor();
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;
    
    // Check if user actually dragged (moved more than 5px)
    const totalDrag = Math.sqrt(
      Math.pow(e.clientX - dragStartPos.x, 2) + 
      Math.pow(e.clientY - dragStartPos.y, 2)
    );
    if (totalDrag > 5) {
      hasDragged = true;
    }
    
    const rotationDelta = {
      x: -deltaY * config.dragSensitivity,
      y: deltaX * config.dragSensitivity
    };
    
    rotation.x = SPHERE_MATH.normalizeAngle(rotation.x + clampRotationSpeed(rotationDelta.x));
    rotation.y = SPHERE_MATH.normalizeAngle(rotation.y + clampRotationSpeed(rotationDelta.y));
    
    velocity = {
      x: clampRotationSpeed(rotationDelta.x),
      y: clampRotationSpeed(rotationDelta.y)
    };
    
    lastMousePos = { x: e.clientX, y: e.clientY };
  };
  
  const handleMouseUp = () => {
    isDragging = false;
    hasDragged = false;
    updateCursor();
  };
  
  const handleTouchStart = (e) => {
    // Don't prevent default if touching an image
    if (e.target.closest('.sphere-image')) {
      return;
    }
    e.preventDefault();
    const touch = e.touches[0];
    isDragging = true;
    velocity = { x: 0, y: 0 };
    lastMousePos = { x: touch.clientX, y: touch.clientY };
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - lastMousePos.x;
    const deltaY = touch.clientY - lastMousePos.y;
    
    const rotationDelta = {
      x: -deltaY * config.dragSensitivity,
      y: deltaX * config.dragSensitivity
    };
    
    rotation.x = SPHERE_MATH.normalizeAngle(rotation.x + clampRotationSpeed(rotationDelta.x));
    rotation.y = SPHERE_MATH.normalizeAngle(rotation.y + clampRotationSpeed(rotationDelta.y));
    
    velocity = {
      x: clampRotationSpeed(rotationDelta.x),
      y: clampRotationSpeed(rotationDelta.y)
    };
    
    lastMousePos = { x: touch.clientX, y: touch.clientY };
  };
  
  const handleTouchEnd = () => {
    isDragging = false;
  };
  
  // Modal functions
  const showModal = () => {
    if (!selectedTestimonial || !modal) return;
    
    document.getElementById('modal-image').src = selectedTestimonial.src;
    document.getElementById('modal-image').alt = selectedTestimonial.alt;
    document.getElementById('modal-text').textContent = selectedTestimonial.text;
    document.getElementById('modal-author-name').textContent = selectedTestimonial.authorName;
    document.getElementById('modal-author-title').textContent = selectedTestimonial.authorTitle;
    document.getElementById('modal-division').textContent = selectedTestimonial.division;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  
  const hideModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    selectedTestimonial = null;
  };
  
  // Setup
  const isMobile = window.innerWidth <= 768;
  sphereContainer.style.cssText = `
    position: relative;
    width: ${config.containerSize}px;
    height: ${config.containerSize}px;
    margin: 0 auto;
    perspective: ${config.perspective}px;
    cursor: grab;
    user-select: none;
    transform: translateX(0);
    ${isMobile ? 'left: auto; right: auto;' : 'left: 0; right: 0;'}
  `;
  
  const updateCursor = () => {
    sphereContainer.style.cursor = isDragging ? 'grabbing' : 'grab';
  };
  updateCursor();
  
  // Initialize
  imagePositions = generateSpherePositions();
  
  // Event listeners - use bubble phase so images can handle clicks first
  sphereContainer.addEventListener('mousedown', handleMouseDown, false);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  sphereContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
  document.addEventListener('touchmove', handleTouchMove, { passive: false });
  document.addEventListener('touchend', handleTouchEnd);
  
  // Also add event delegation on container as backup for clicks
  sphereContainer.addEventListener('click', (e) => {
    const clickedImage = e.target.closest('.sphere-image');
    if (clickedImage) {
      const testimonialIndex = parseInt(clickedImage.dataset.testimonialIndex);
      if (testimonialIndex !== undefined && testimonials[testimonialIndex]) {
        selectedTestimonial = testimonials[testimonialIndex];
        showModal();
      }
    }
  }, false);
  
  if (modalClose) {
    modalClose.addEventListener('click', hideModal);
  }
  
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('testimonial-modal-overlay')) {
        hideModal();
      }
    });
  }
  
  // Start animation
  animate();
  
  // Cleanup on resize
  let resizeTimer;
  const handleResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      // Update config for new size
      const newContainerSize = Math.min(1000, window.innerWidth * 0.85);
      if (window.innerWidth <= 768) {
        config.containerSize = Math.min(600, window.innerWidth * 0.92);
        config.sphereRadius = 180;
        config.baseImageScale = 0.13;
      } else {
        config.containerSize = newContainerSize;
        config.sphereRadius = 270;
        config.baseImageScale = 0.13;
      }
      
      const newBaseImageSize = config.containerSize * config.baseImageScale;
      baseImageSize = newBaseImageSize;
      
      // Clear cache on resize to force re-render
      cachedElements.forEach(el => el.remove());
      cachedElements.clear();
      isFirstRender = true;
      
      const isMobileNow = window.innerWidth <= 768;
      sphereContainer.style.width = `${config.containerSize}px`;
      sphereContainer.style.height = `${config.containerSize}px`;
      sphereContainer.style.transform = 'translateX(0)';
      sphereContainer.style.left = isMobileNow ? 'auto' : '0';
      sphereContainer.style.right = isMobileNow ? 'auto' : '0';
      
      // Restart animation
      animate();
    }, 250);
  };
  
  window.addEventListener('resize', handleResize);
  
  // Return cleanup function
  return () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };
}

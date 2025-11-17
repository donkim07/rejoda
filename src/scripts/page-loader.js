// Page Loader with SVG Logo Animations
import gsap from 'gsap';

export function initPageLoader() {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;

  const logoGroup = loader.querySelector('#logo');
  const logoNameGroup = loader.querySelector('#logo_name');
  
  if (!logoGroup || !logoNameGroup) return;

  // Get all paths
  const logoPaths = logoGroup.querySelectorAll('path');
  const namePaths = logoNameGroup.querySelectorAll('path');

  // Set initial states for logo paths (essence flowing from bottom to top)
  logoPaths.forEach((path, index) => {
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;
    path.style.fill = 'none';
    path.style.strokeWidth = '2';

    // Set different stroke colors for different paths
    if (index === 0) path.style.stroke = 'url(#radial-gradient)';
    else if (index === 1) path.style.stroke = 'url(#radial-gradient-2)';
    else if (index === 2) path.style.stroke = 'url(#radial-gradient-3)';
    else if (index === 3) path.style.stroke = 'url(#radial-gradient-4)';
  });

  // Set initial states for text paths
  namePaths.forEach((path, index) => {
    path.style.opacity = '0';
    path.style.transform = 'translateY(30px) scale(0.5)';
    path.style.filter = 'blur(10px)';
  });

  // Create timeline for logo paths (essence flowing from bottom to top)
  const logoTL = gsap.timeline({ repeat: 0 });
  
  logoPaths.forEach((path, index) => {
    const pathLength = path.getTotalLength();
    logoTL.to(path, {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: 'power2.out'
    }, index * 0.15);
    
    // Fill animation after stroke
    logoTL.to(path, {
      fill: `url(#radial-gradient${index === 0 ? '' : index === 1 ? '-2' : index === 2 ? '-3' : '-4'})`,
      duration: 0.6,
      ease: 'power1.inOut'
    }, index * 0.15 + 1);
  });

  // Create timeline for text (matrix/robotic appearance)
  const textTL = gsap.timeline({ delay: 1.5 });
  
  namePaths.forEach((path, index) => {
    // Matrix-style reveal with quick flash
    textTL.fromTo(path, 
      {
        opacity: 0,
        y: 30,
        scale: 0.5,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.3,
        ease: 'back.out(2)'
      },
      index * 0.06
    );
    
    // Add a quick flash effect (matrix style)
    textTL.to(path, {
      opacity: 0.3,
      duration: 0.05,
      yoyo: true,
      repeat: 1
    }, index * 0.06 + 0.25);
    
    textTL.to(path, {
      opacity: 1,
      duration: 0.1
    });
  });

  // Add glow effect to logo
  gsap.to(logoGroup, {
    filter: 'drop-shadow(0 0 30px rgba(63, 220, 232, 0.8))',
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 0.8
  });

  // Hide loader - MAX 2.5 seconds
  const startTime = Date.now();
  const maxDuration = 2500; // 2.5 seconds max
  
  const hideLoader = () => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, maxDuration - elapsed);
    
    setTimeout(() => {
      const hideTL = gsap.timeline();
      
      // Fade out text first
      hideTL.to(namePaths, {
        opacity: 0,
        y: -20,
        scale: 0.9,
        duration: 0.3,
        stagger: 0.02,
        ease: 'power2.in'
      });
      
      // Then fade out logo
      hideTL.to(logoPaths, {
        opacity: 0,
        scale: 0.95,
        y: 10,
        duration: 0.4,
        stagger: 0.03,
        ease: 'power2.in'
      }, 0.15);
      
      // Finally fade out loader
      hideTL.to(loader, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          loader.style.display = 'none';
          loader.remove();
        }
      }, 0.2);
    }, remaining);
  };

  // Wait for page load or max time
  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
    // Fallback: hide after max duration even if page hasn't loaded
    setTimeout(hideLoader, maxDuration);
  }
}

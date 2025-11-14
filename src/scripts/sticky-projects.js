// Sticky Projects Effect (from stickysection.html)
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initStickyProjects() {
  const projectContents = document.querySelectorAll('.project-content');
  const projectVisuals = document.querySelectorAll('.project-visual');
  const stickySection = document.querySelector('.sticky-projects');
  
  if (projectContents.length === 0 || !stickySection) return;
  
  // Initial state - show first project
  projectContents.forEach((content, index) => {
    content.classList.remove('active');
    if (projectVisuals[index]) projectVisuals[index].classList.remove('active');
  });
  
  if (projectContents[0]) projectContents[0].classList.add('active');
  if (projectVisuals[0]) projectVisuals[0].classList.add('active');
  
  // Create ScrollTrigger for project switching
  ScrollTrigger.create({
    trigger: '.sticky-projects',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const progress = self.progress;
      const sectionCount = projectContents.length;
      const currentIndex = Math.floor(progress * sectionCount);
      const clampedIndex = Math.min(currentIndex, sectionCount - 1);
      
      // Update active states
      projectContents.forEach((content, index) => {
        const visual = projectVisuals[index];
        
        if (index === clampedIndex) {
          content.classList.add('active');
          if (visual) visual.classList.add('active');
        } else {
          content.classList.remove('active');
          if (visual) visual.classList.remove('active');
        }
      });
    }
  });
  
  // Pin the projects container
  ScrollTrigger.create({
    trigger: '.sticky-projects',
    start: 'top top',
    end: 'bottom bottom',
    pin: '.projects-sticky-wrapper',
    pinSpacing: false
  });
}

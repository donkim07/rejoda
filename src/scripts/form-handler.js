// Contact Form Handler
import gsap from 'gsap';

export function initFormHandler() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Disable button and show loading
    submitButton.disabled = true;
    submitButton.innerHTML = 'Sending...';
    gsap.to(submitButton, { scale: 0.95, duration: 0.2 });
    
    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Success state
    submitButton.innerHTML = '✓ Message Sent!';
    gsap.to(submitButton, { 
      backgroundColor: '#00d9a3',
      scale: 1,
      duration: 0.3 
    });
    
    // Reset form
    form.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
      gsap.to(submitButton, { backgroundColor: '', duration: 0.3 });
    }, 3000);
  });
}


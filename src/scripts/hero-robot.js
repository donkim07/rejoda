// Hero 3D Robot - Spline Integration
export async function initHeroRobot() {
    const robotContainer = document.getElementById('spline-robot');
    if (!robotContainer) return;
  
    try {
      // Load Spline runtime via ES module import
      const { Application } = await import('https://unpkg.com/@splinetool/runtime');
  
      // Create canvas and app instance
      const canvas = document.createElement('canvas');
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'auto';
  
      robotContainer.appendChild(canvas);
  
      const app = new Application(canvas);
  
      // Load the Spline scene
      await app.load('https://prod.spline.design/7eEkVq1Bc-EP7zlv/scene.splinecode');

      
      
    } catch (error) {
      console.warn('Spline scene could not be loaded:', error);
      robotContainer.style.display = 'none';
    }
  }
  
// Simple Router for Clean URLs - Intercepts navigation and updates URLs
export function initRouter() {
  // Intercept all internal link clicks
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    
    // Skip external links, anchors, mailto, tel, etc.
    if (!href || 
        href.startsWith('http') || 
        href.startsWith('mailto:') || 
        href.startsWith('tel:') || 
        href.startsWith('#') || 
        href.startsWith('javascript:')) {
      return;
    }

    // Convert clean URLs to .html for actual navigation
    const cleanPath = href.replace(/^\/+/, '').replace(/\.html$/, '');
    const htmlPath = cleanPath === '' || cleanPath === 'index' ? 'index.html' : `${cleanPath}.html`;
    const cleanUrl = cleanPath === '' || cleanPath === 'index' ? '/' : `/${cleanPath}`;
    
    // Check if this is an internal route
    const routes = ['', 'index', 'about', 'projects', 'contact'];
    if (routes.includes(cleanPath)) {
      e.preventDefault();
      
      // Update URL to clean version BEFORE navigation
      window.history.pushState({ path: cleanUrl }, '', cleanUrl);
      
      // Navigate to the actual HTML file
      window.location.href = htmlPath;
    }
  });

  // Handle browser back/forward
  window.addEventListener('popstate', (e) => {
    const path = window.location.pathname;
    const cleanPath = path.replace(/^\/+/, '').replace(/\.html$/, '');
    const htmlPath = cleanPath === '' || cleanPath === 'index' ? 'index.html' : `${cleanPath}.html`;
    
    // Only navigate if we're not already on the right page
    const currentFile = window.location.pathname.split('/').pop();
    if (currentFile !== htmlPath && !currentFile.endsWith('.html')) {
      window.location.href = htmlPath;
    }
  });

  // On page load, update URL to clean version if it has .html
  const currentPath = window.location.pathname;
  if (currentPath.includes('.html')) {
    const cleanPath = currentPath.replace(/\.html$/, '').replace(/^\/+/, '');
    const cleanUrl = cleanPath === '' || cleanPath === 'index' ? '/' : `/${cleanPath}`;
    window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
  }
}

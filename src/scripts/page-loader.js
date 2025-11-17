// Page Loader - Fire Theme
export function initPageLoader() {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;

  // Hide loader when page is loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      // Remove from DOM after animation
      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 1000); // Show for at least 1 second
  });

  // Also hide if page loads very quickly
  if (document.readyState === 'complete') {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 1000);
  }
}


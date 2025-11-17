import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        about: './about.html',
        projects: './projects.html',
        contact: './contact.html',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    // Handle clean URLs - rewrite /about to about.html, etc.
    middlewareMode: false,
  },
  // PRODUCTION CONFIGURATION NOTES:
  // For production deployment with clean URLs, you'll need to configure your web server:
  //
  // 1. Nginx example:
  //    location / {
  //      try_files $uri $uri.html $uri/ /index.html;
  //    }
  //
  // 2. Apache (.htaccess):
  //    RewriteEngine On
  //    RewriteCond %{REQUEST_FILENAME} !-f
  //    RewriteCond %{REQUEST_FILENAME} !-d
  //    RewriteRule ^([^\.]+)$ $1.html [NC,L]
  //
  // 3. Netlify (_redirects file in public folder):
  //    /*    /index.html   200
  //
  // 4. Vercel (vercel.json):
  //    {
  //      "rewrites": [
  //        { "source": "/(.*)", "destination": "/$1.html" }
  //      ]
  //    }
  //
  // 5. For static hosting, ensure all routes serve index.html and let client-side router handle it
});

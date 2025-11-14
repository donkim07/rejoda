# REJODA Project Structure

## Overview
Modern, modular website built with Vite, GSAP, and Lenis. Features advanced scroll animations including stacked cards, smooth scrolling, and responsive design.

## File Structure

```
rejoda/
│
├── 📄 HTML Pages (Root)
│   ├── index.html          # Home page with hero, services, stats, projects
│   ├── about.html          # About page with company story and mission
│   ├── projects.html       # Projects showcase with stacked cards
│   └── contact.html        # Contact form and information
│
├── 📁 src/
│   │
│   ├── 📁 styles/          # Modular CSS
│   │   ├── variables.css   # CSS custom properties (colors, spacing, fonts)
│   │   ├── reset.css       # Browser resets and base styles
│   │   ├── layout.css      # Container and section layouts
│   │   ├── navigation.css  # Navbar and mobile menu
│   │   ├── hero.css        # Hero section styles
│   │   ├── buttons.css     # Button components
│   │   ├── cards.css       # Service and project cards
│   │   ├── footer.css      # Footer styles
│   │   └── utilities.css   # Utility classes and stats section
│   │
│   └── 📁 scripts/         # Modular JavaScript
│       ├── main.js              # Entry point - imports all modules
│       ├── smooth-scroll.js     # Lenis smooth scrolling
│       ├── navigation.js        # Navigation behavior & mobile menu
│       ├── hero-animations.js   # Hero entrance & scroll animations
│       ├── stacked-cards.js     # Service cards stacking effect
│       ├── project-cards.js     # Project cards with pinning
│       ├── counters.js          # Animated number counters
│       ├── reveals.js           # Fade/slide/scale reveal animations
│       ├── back-to-top.js       # Back to top button
│       └── form-handler.js      # Contact form submission
│
├── 📁 public/              # Static assets (images, icons, etc.)
│
├── 📁 gsap examples/       # Reference examples for GSAP animations
│   ├── stackedcards.html
│   ├── stickysection.html
│   └── 3Dspacialzoom.html
│
├── ⚙️ Configuration Files
│   ├── vite.config.js      # Vite configuration
│   ├── package.json        # Dependencies and scripts
│   └── .gitignore          # Git ignore rules
│
└── 📚 Documentation
    ├── README.md           # Project overview and quick start
    ├── DEVELOPMENT.md      # Detailed development guide
    └── PROJECT_STRUCTURE.md # This file
```

## Key Features by File

### HTML Pages

**index.html**
- Hero section with title, subtitle, CTAs
- Services section with stacked card effect
- Stats counter section
- Featured projects grid
- Footer with navigation

**about.html**
- Company story
- Vision and mission statements
- Impact statistics
- Responsive layout

**projects.html**
- All projects with stacked card effect
- Project categories and descriptions
- Live site links

**contact.html**
- Contact form with validation
- Contact information
- Email and location details

### CSS Modules

| File | Purpose | Key Features |
|------|---------|--------------|
| `variables.css` | Design tokens | Colors, spacing, typography, shadows |
| `reset.css` | Base styles | Browser resets, typography defaults |
| `layout.css` | Layout system | Containers, sections, headers |
| `navigation.css` | Navigation | Fixed navbar, mobile menu, hover effects |
| `hero.css` | Hero section | Full-height hero, centered content |
| `buttons.css` | Button components | Primary/secondary variants, hover states |
| `cards.css` | Card components | Service cards, project cards, grid layouts |
| `footer.css` | Footer | Multi-column footer, back-to-top button |
| `utilities.css` | Utilities | Helper classes, stats section |

### JavaScript Modules

| File | Purpose | GSAP Features |
|------|---------|---------------|
| `main.js` | Entry point | Plugin registration, initialization |
| `smooth-scroll.js` | Smooth scrolling | Lenis integration with ScrollTrigger |
| `navigation.js` | Navigation | Scroll-based show/hide |
| `hero-animations.js` | Hero effects | Entrance timeline, border-radius on scroll |
| `stacked-cards.js` | Card stacking | Pinning, scaling, scrub animation |
| `project-cards.js` | Project effects | Stacking with rotation, content reveals |
| `counters.js` | Number animation | Count-up effect on scroll |
| `reveals.js` | Scroll reveals | Fade in, slide up, scale in |
| `back-to-top.js` | Scroll to top | Smooth scroll with Lenis |
| `form-handler.js` | Form submission | Animated success state |

## Animation Techniques Used

### 1. Stacked Cards Effect
- **Implementation**: `stacked-cards.js`, `project-cards.js`
- **Technique**: ScrollTrigger pin + scale animation
- **Inspiration**: From `stackedcards.html` example

### 2. Smooth Scrolling
- **Implementation**: `smooth-scroll.js`
- **Library**: Lenis
- **Integration**: Connected to ScrollTrigger

### 3. Hero Border Radius
- **Implementation**: `hero-animations.js`
- **Technique**: Scrubbed animation on scroll
- **Effect**: Curved bottom edge appears on scroll

### 4. Counter Animations
- **Implementation**: `counters.js`
- **Technique**: innerHTML snapping
- **Trigger**: Once when entering viewport

### 5. Reveal Animations
- **Implementation**: `reveals.js`
- **Classes**: `.fade-in`, `.slide-up`, `.scale-in`
- **Technique**: Scroll-triggered opacity/transform

## Dependencies

```json
{
  "dependencies": {
    "lenis": "^1.1.0",      // Smooth scrolling
    "gsap": "^3.12.5"        // Animation library
  },
  "devDependencies": {
    "vite": "^7.1.12"        // Build tool
  }
}
```

## NPM Scripts

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production (outputs to dist/)
npm run preview  # Preview production build
```

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

1. **Modular CSS** - Load only what's needed
2. **ES6 Modules** - Tree-shaking in production
3. **Vite** - Fast HMR and optimized builds
4. **GSAP** - Hardware-accelerated animations
5. **Lazy Loading** - Images load on demand
6. **Responsive Design** - Mobile-first approach

## Design System

### Colors
- Primary: `#0f172a` (Dark blue)
- Accent: `#00d9a3` (Teal green)
- Text: `#334155` (Gray)
- Background: `#ffffff` (White)

### Typography
- Headings: Playfair Display (serif)
- Body: Inter (sans-serif)

### Spacing Scale
- XS: 0.5rem
- SM: 1rem
- MD: 2rem
- LG: 4rem
- XL: 6rem
- 2XL: 8rem

### Border Radius
- SM: 0.5rem
- MD: 1rem
- LG: 2rem
- XL: 3rem

## Development Workflow

1. **Install**: `npm install`
2. **Develop**: `npm run dev`
3. **Edit files** in `src/` - Hot reload enabled
4. **Test** in browser at localhost:3000
5. **Build**: `npm run build`
6. **Preview**: `npm run preview`

## Adding New Features

### New Animation
1. Create file in `src/scripts/`
2. Export init function
3. Import in `main.js`
4. Call in DOMContentLoaded

### New Styles
1. Create file in `src/styles/`
2. Import in `main.js`
3. Use CSS variables

### New Page
1. Create HTML in root
2. Add to `vite.config.js` input
3. Include `main.js` script

## Credits

**Team**: Allen Zawadi, Regina Dagharo, Joan Samwel, Donald Kimonge  
**Powered by**: GSAP & Lenis  
**Built with**: Vite  
**Company**: Rejoda - Serving with Care


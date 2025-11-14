# Development Guide

## Quick Start

1. **Install dependencies**:
```bash
npm install
```

2. **Start dev server**:
```bash
npm run dev
```

The site will open at `http://localhost:3000`

## Project Architecture

### Modular CSS Structure

Each CSS file has a specific purpose:

- `variables.css` - CSS custom properties (colors, spacing, etc.)
- `reset.css` - Browser resets and base styles
- `layout.css` - Container and section layouts
- `navigation.css` - Navigation bar and mobile menu
- `hero.css` - Hero section styles
- `buttons.css` - Button components
- `cards.css` - Service and project cards
- `footer.css` - Footer styles
- `utilities.css` - Utility classes and stats

### Modular JavaScript Structure

Each JS file handles specific functionality:

- `main.js` - Entry point, imports all modules
- `smooth-scroll.js` - Lenis smooth scrolling setup
- `navigation.js` - Navigation behavior
- `hero-animations.js` - Hero section animations
- `stacked-cards.js` - Stacked card effect for services
- `project-cards.js` - Project card animations
- `counters.js` - Number counter animations
- `reveals.js` - Scroll reveal animations
- `back-to-top.js` - Back to top button
- `form-handler.js` - Contact form submission

## GSAP Animations

### Stacked Cards Effect
Based on the `stackedcards.html` example. Cards stack and scale as you scroll:

```javascript
// Pin each card and scale it down
ScrollTrigger.create({
  trigger: card,
  start: "top 20%",
  end: () => lastCardST.start,
  pin: true,
  pinSpacing: false,
  scrub: 0.5,
  animation: scaleDown
});
```

### Hero Border Radius
Smooth border-radius animation on scroll:

```javascript
gsap.to(heroSection, {
  borderRadius: '0 0 40px 40px',
  scale: 0.95,
  scrollTrigger: {
    trigger: heroSection,
    start: 'top top',
    end: 'bottom top',
    scrub: 1
  }
});
```

### Counter Animations
Numbers animate from 0 to target value:

```javascript
gsap.to(counter, {
  innerHTML: target,
  duration: 2,
  snap: { innerHTML: 1 }
});
```

## Adding New Pages

1. **Create HTML file** in root directory
2. **Add to `vite.config.js`**:
```javascript
input: {
  newpage: './newpage.html'
}
```
3. **Include the main.js script**:
```html
<script type="module" src="/src/scripts/main.js"></script>
```

## Adding New Animations

1. **Create new module** in `src/scripts/`
2. **Export init function**:
```javascript
export function initMyAnimation() {
  // Animation code
}
```
3. **Import in main.js**:
```javascript
import { initMyAnimation } from './my-animation.js';
// Call in DOMContentLoaded
initMyAnimation();
```

## Styling Guidelines

### Use CSS Variables
Always use defined variables for consistency:
```css
color: var(--color-accent);
padding: var(--space-lg);
border-radius: var(--radius-md);
```

### Responsive Design
Mobile-first approach:
```css
/* Mobile first */
.element {
  width: 100%;
}

/* Desktop */
@media (min-width: 768px) {
  .element {
    width: 50%;
  }
}
```

### Class Naming
Use descriptive, component-based names:
- `.service-card` - Component
- `.service-card__title` - Element
- `.service-card--featured` - Modifier

## Performance Tips

1. **Lazy load images** - Use loading="lazy"
2. **Minimize GSAP animations** on mobile
3. **Use CSS transforms** for animations (GPU accelerated)
4. **Debounce resize events** (already implemented)

## Building for Production

```bash
npm run build
```

Output will be in `dist/` folder.

### Preview production build:
```bash
npm run preview
```

## Troubleshooting

### Animations not working
- Check if GSAP is loaded: Open console, type `gsap`
- Verify ScrollTrigger registration
- Check element selectors exist in DOM

### Smooth scroll not working
- Verify Lenis is imported correctly
- Check for console errors
- Try disabling browser extensions

### Mobile menu not opening
- Check hamburger event listener
- Verify CSS classes are applied
- Check z-index conflicts

## Browser DevTools

### ScrollTrigger markers:
```javascript
ScrollTrigger.create({
  markers: true // Show start/end markers
});
```

### GSAP DevTools:
Install from: https://greensock.com/docs/v3/Plugins/GSDevTools

## Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Lenis Documentation](https://github.com/studio-freight/lenis)
- [Vite Documentation](https://vitejs.dev/)


# REJODA - Serving with Care

Modern, animated website for Rejoda - a multi-sector company providing IT solutions, healthcare products, and logistics services across Tanzania.

## Features

✨ **Modern Design**
- Beautiful, responsive UI with smooth animations
- Modular CSS architecture for easy maintenance
- Mobile-first design approach

🎬 **Advanced Animations**
- GSAP ScrollTrigger for scroll-based animations
- Lenis smooth scrolling
- Stacked cards effect
- Parallax animations
- Reveal animations

🏗️ **Architecture**
- Vite for fast development and building
- Modular JavaScript with ES6 modules
- Separated CSS files for better organization
- Multiple HTML pages with shared components

## Tech Stack

- **Build Tool**: Vite
- **Animation**: GSAP 3.x (ScrollTrigger)
- **Smooth Scroll**: Lenis
- **Styling**: Modular CSS
- **JavaScript**: ES6 Modules

## Project Structure

```
rejoda/
├── index.html          # Home page
├── about.html          # About page
├── projects.html       # Projects showcase
├── contact.html        # Contact page
├── src/
│   ├── styles/         # Modular CSS files
│   │   ├── variables.css
│   │   ├── reset.css
│   │   ├── layout.css
│   │   ├── navigation.css
│   │   ├── hero.css
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   ├── footer.css
│   │   └── utilities.css
│   └── scripts/        # Modular JavaScript
│       ├── main.js
│       ├── smooth-scroll.js
│       ├── navigation.js
│       ├── hero-animations.js
│       ├── stacked-cards.js
│       ├── project-cards.js
│       ├── counters.js
│       ├── reveals.js
│       └── back-to-top.js
├── vite.config.js      # Vite configuration
└── package.json
```

## Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Run development server**:
```bash
npm run dev
```

3. **Build for production**:
```bash
npm run build
```

4. **Preview production build**:
```bash
npm run preview
```

## Development

The site will automatically open at `http://localhost:3000` when you run the dev server.

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Animation Features

### Stacked Cards Effect
Service cards stack on top of each other as you scroll, inspired by modern design patterns.

### Smooth Scrolling
Implemented using Lenis for buttery smooth scroll behavior.

### Scroll-Triggered Animations
- Fade in elements
- Slide up content
- Scale in cards
- Counter animations
- Parallax effects

### Hero Border Radius Animation
The hero section's border radius changes as you scroll, creating a curved effect.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Credits

**Developed by**: Rejoda Team
- Allen Zawadi
- Regina Dagharo
- Joan Samwel
- Donald Kimonge

**Powered by**: GSAP & Lenis

## License

UNLICENSED - Private project

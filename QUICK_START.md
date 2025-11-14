# 🚀 Quick Start Guide

## Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The website will automatically open at **http://localhost:3000** 🎉

### 3. Build for Production
```bash
npm run build
```

---

## What You've Got

### ✨ Features
- **Beautiful Modern Design** - Clean, professional UI
- **Smooth Scrolling** - Powered by Lenis
- **Advanced GSAP Animations**:
  - 🎴 Stacked cards effect (like your examples)
  - 🎯 Scroll-triggered reveals
  - 📊 Animated counters
  - 🎬 Hero border-radius animation
  - ✨ Parallax effects
- **Fully Responsive** - Works on all devices
- **Modular Architecture** - Easy to maintain and extend

### 📄 Pages
- **Home** (`index.html`) - Hero, services, stats, featured projects
- **About** (`about.html`) - Company story, vision, mission
- **Projects** (`projects.html`) - All projects with stacked cards
- **Contact** (`contact.html`) - Contact form and info

### 🎨 Modular CSS (9 files)
Each CSS file handles a specific part:
- `variables.css` - Design tokens
- `reset.css` - Base styles
- `layout.css` - Layouts
- `navigation.css` - Navbar
- `hero.css` - Hero section
- `buttons.css` - Buttons
- `cards.css` - Cards
- `footer.css` - Footer
- `utilities.css` - Utilities

### 📦 Modular JavaScript (10 files)
Each JS file handles specific functionality:
- `main.js` - Entry point
- `smooth-scroll.js` - Lenis setup
- `navigation.js` - Nav behavior
- `hero-animations.js` - Hero effects
- `stacked-cards.js` - Card stacking
- `project-cards.js` - Project animations
- `counters.js` - Number counters
- `reveals.js` - Scroll reveals
- `back-to-top.js` - Scroll to top
- `form-handler.js` - Form submission

---

## 🎯 Key Animations Implemented

### 1. Stacked Cards (From Your Examples)
Service and project cards stack and scale as you scroll - exactly like `stackedcards.html`

### 2. Smooth Scrolling
Buttery smooth scrolling with Lenis, integrated with ScrollTrigger

### 3. Hero Animation
Border-radius and scale animation on scroll for modern curved effect

### 4. Counter Animations
Stats numbers count up from 0 when they enter the viewport

### 5. Reveal Animations
Elements fade in, slide up, or scale in as you scroll

---

## 📖 Documentation

- **README.md** - Project overview
- **DEVELOPMENT.md** - Detailed development guide
- **PROJECT_STRUCTURE.md** - Complete file structure breakdown
- **QUICK_START.md** - This file

---

## 🔧 Customization

### Change Colors
Edit `src/styles/variables.css`:
```css
--color-primary: #0f172a;
--color-accent: #00d9a3;
```

### Add New Animation
1. Create file in `src/scripts/`
2. Export init function
3. Import in `main.js`

### Add New Page
1. Create HTML file in root
2. Add to `vite.config.js`
3. Include main.js script

---

## 🐛 Troubleshooting

**Animations not working?**
- Check browser console for errors
- Verify GSAP is loaded: Type `gsap` in console
- Make sure elements have correct class names

**Dev server not starting?**
- Delete `node_modules` and run `npm install` again
- Check if port 3000 is already in use

**Styles not applying?**
- Check browser console for CSS import errors
- Verify file paths are correct
- Try clearing browser cache

---

## 📚 Learn More

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Lenis GitHub](https://github.com/studio-freight/lenis)
- [Vite Guide](https://vitejs.dev/guide/)

---

## 🎉 You're All Set!

Run `npm run dev` and start building something amazing!

**Made with ❤️ by the Rejoda Team**


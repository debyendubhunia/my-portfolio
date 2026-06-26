========================================================================
             Debyendu Bhunia - Senior Web Developer Portfolio
========================================================================

A premium, interactive, and fully responsive developer portfolio website designed 
to highlight 8+ years of structural PHP and WordPress custom development expertise.

------------------------------------------------------------------------
1. Codebase Structure
------------------------------------------------------------------------
- index.html   : Main structure of the portfolio containing hero, about, 
                 skills grid, services, work timeline, slider, and modals.
- style.css    : Custom premium stylesheet incorporating dark/light vars,
                 glassmorphism borders, timeline details, slider overrides, 
                 and custom mobile responsive overrides.
- script.js    : Client-side interaction triggers containing dark mode toggles, 
                 animated typewriter subtitle script, intersection observers, 
                 skill grid category filters, and Slick Slider logic.
- assets/      : Local storage directory for media assets, profile avatar, 
                 and CV download documents.

------------------------------------------------------------------------
2. Core Interactive Features
------------------------------------------------------------------------
- Slick Slider Projects Carousel: 
  Interactive carousel showcasing 5 main backend & CMS projects (Peace9, 
  Hotel Inventory ERP, Tour & Travel Catalog ERP, Hybrid Events, Vanatex) 
  with touch-swipe support and custom navigation arrow controllers.
- Deep Tech Detail Modals: 
  Each project features detail modals displaying metadata arrays, 
  technologies, and architectural overview descriptions.
- Responsive Nav & Glassmorphic Collapsed Menu: 
  Smooth scroll tracking active links. Collapses into a glassmorphic menu 
  card on mobile viewports for clean contrast.
- Typing Subtitle Effect: 
  Asynchronous typing loop highlighting developer key roles.
- Interactive Skills Filter: 
  Categorized skill selector (Backend, Frontend, CMS, Tools) with animated 
  percentage progress indicators.

------------------------------------------------------------------------
3. Technology Stack & CDNs
------------------------------------------------------------------------
- Markup & Styling: HTML5, CSS3, Bootstrap 5 CSS
- Logic Frameworks: JavaScript (ES6), jQuery 3.7.1, Slick Slider 1.8.1 JS/CSS
- Font Icons      : FontAwesome 6 Free CDN

------------------------------------------------------------------------
4. Local Execution
------------------------------------------------------------------------
As this is a static frontend website, it can be loaded directly from the filesystem 
or through local Apache servers like XAMPP:
1. Copy the folder to `C:\xampp\htdocs\my-portfolio\`
2. Boot the Apache module in the XAMPP Control Panel.
3. Access the webpage via: `http://localhost/my-portfolio/index.html` (or 127.0.0.1)
========================================================================

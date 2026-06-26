/**
 * Main Interaction Script for Debyendu Bhunia's Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initTheme();
  initStickyNavbar();
  initTypingEffect();
  initScrollSpy();
  initScrollReveal();
  initSkillFilters();
  initProjectsSlider();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. Dark/Light Theme Handler
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  // Retrieve saved theme or check system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set default theme to dark if not saved
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'dark');
  document.body.setAttribute('data-theme', initialTheme);
  updateThemeIcon(initialTheme);

  // Theme Toggle Button Event Listener
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;
  
  const moonIcon = themeToggleBtn.querySelector('.fa-moon');
  const sunIcon = themeToggleBtn.querySelector('.fa-sun');
  
  if (theme === 'dark') {
    if (moonIcon) moonIcon.style.display = 'none';
    if (sunIcon) sunIcon.style.display = 'block';
  } else {
    if (moonIcon) moonIcon.style.display = 'block';
    if (sunIcon) sunIcon.style.display = 'none';
  }
}

/* ==========================================================================
   2. Sticky Navigation Bar
   ========================================================================== */
function initStickyNavbar() {
  const navbar = document.getElementById('main-nav');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  // Initial check in case page is refreshed while scrolled
  handleScroll();
  window.addEventListener('scroll', handleScroll);
}

/* ==========================================================================
   3. Animated Typing Effect
   ========================================================================== */
function initTypingEffect() {
  const target = document.getElementById('typed-text');
  if (!target) return;

  const words = [
    "Senior PHP Developer",
    "WordPress Expert",
    "Laravel & CodeIgniter Developer",
    "AI Application Developer"
  ];
  
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIdx];
    
    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50; // Faster deleting speed
    } else {
      target.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 100; // Normal typing speed
    }

    if (!isDeleting && charIdx === currentWord.length) {
      // Pause at full word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      // Cycle to next word
      wordIdx = (wordIdx + 1) % words.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing
  setTimeout(type, 500);
}

/* ==========================================================================
   4. Scrollspy (Active Link Highlighting)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section, footer');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (!sections.length || !navLinks.length) return;

  const highlightNav = () => {
    let scrollPosition = window.scrollY + 120; // offset for nav bar

    sections.forEach(section => {
      if (!section.id) return;
      
      const top = section.offsetTop;
      const height = section.offsetHeight;
      
      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${section.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav);
  highlightNav(); // Trigger initial state
}

/* ==========================================================================
   5. Scroll Reveal Animation using IntersectionObserver
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  if (!reveals.length) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // If it's a skill card inside, check if we need to animate progress bar
        const progressBar = entry.target.querySelector('.skill-progress-bar');
        if (progressBar) {
          animateProgressBar(progressBar);
        }

        // If it's the projects slider, force setPosition to resolve rendering bugs
        if (entry.target.classList.contains('projects-slider')) {
          setTimeout(() => {
            $('.projects-slider').slick('setPosition');
          }, 100);
        }
        
        // Remove observer after animation runs
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });
  
  // Custom observer for skill section to guarantee progress bar triggers
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll('.skill-progress-bar');
          progressBars.forEach(bar => animateProgressBar(bar));
        }
      });
    }, { threshold: 0.1 });
    skillsObserver.observe(skillsSection);
  }
}

function animateProgressBar(progressBar) {
  const targetVal = progressBar.getAttribute('data-val');
  if (targetVal) {
    progressBar.style.width = `${targetVal}%`;
  }
}

/* ==========================================================================
   6. Skill Categories Tab Filtering
   ========================================================================== */
function initSkillFilters() {
  const tabs = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  
  if (!tabs.length || !skillCards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle active tab class
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-tab');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        // Visual exit transitions
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8) translateY(10px)';
        
        setTimeout(() => {
          if (filterVal === 'all' || category === filterVal) {
            card.style.display = 'block';
            
            // Re-trigger progress bar animation inside filtered cards
            const progressBar = card.querySelector('.skill-progress-bar');
            if (progressBar) {
              progressBar.style.width = '0%';
              setTimeout(() => {
                animateProgressBar(progressBar);
              }, 50);
            }
            
            // Enter transition
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1) translateY(0)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        }, 300);
      });
    });
  });
}

/* ==========================================================================
   7. Premium Contact Form Handler
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const statusMsg = document.getElementById('form-status-msg');
  
  if (!form || !statusMsg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous alerts
    statusMsg.className = 'form-status';
    statusMsg.textContent = '';
    
    // Check validation
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim();
    const message = document.getElementById('form-message').value.trim();
    
    if (!name || !email || !subject || !message) {
      statusMsg.classList.add('error');
      statusMsg.textContent = 'Please fill out all fields.';
      return;
    }
    
    if (!validateEmail(email)) {
      statusMsg.classList.add('error');
      statusMsg.textContent = 'Please enter a valid email address.';
      return;
    }
    
    // Form Button loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';
    
    // Simulate AJAX Request
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      
      // Success response simulation
      statusMsg.classList.add('success');
      statusMsg.textContent = `Thank you, ${name}! Your message has been sent successfully. Debyendu will respond shortly.`;
      
      form.reset();
    }, 1800);
  });
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/* ==========================================================================
   8. Back To Top Action
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   9. Slick Slider Initialization for Projects
   ========================================================================== */
function initProjectsSlider() {
  const $slider = $('.projects-slider');
  if (!$slider.length) return;

  $slider.slick({
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  });
}


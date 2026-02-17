// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Typing effect for hero subtitle
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let index = 0;

    function type() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }

    // Start typing after a short delay
    setTimeout(type, 500);
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
const fadeElements = document.querySelectorAll('.project-card, .blog-card, .timeline-item, .skill-category');
fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Contact form handling with XSS-safe feedback
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            e.preventDefault();
            alert('Please fill in all fields.');
            return;
        }

        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return;
        }

        // If using Formspree, the form submits natively via action/method.
        // If you want to handle it via JS instead (e.g. AJAX), use textContent
        // for any DOM feedback to prevent XSS:
        //
        // feedbackDiv.textContent = `Thanks, ${name}! Your message has been sent.`;
        //
        // NEVER use innerHTML with user input.
    });
}

// Project card hover effect - add subtle tilt
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Glitch effect on hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    setInterval(() => {
        heroTitle.style.textShadow = `
            ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 rgba(0, 255, 136, 0.7),
            ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 rgba(0, 204, 255, 0.7)
        `;
        
        setTimeout(() => {
            heroTitle.style.textShadow = 'none';
        }, 50);
    }, 3000);
}

// Add cursor trail effect (with DOM flooding protection)
let mouseX = 0;
let mouseY = 0;
let cursorTrail = [];
const MAX_TRAIL_ELEMENTS = 20;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function createCursorTrail() {
    if (cursorTrail.length >= MAX_TRAIL_ELEMENTS) return; // Prevent DOM flooding

    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.width = '6px';
    trail.style.height = '6px';
    trail.style.borderRadius = '50%';
    trail.style.background = 'var(--primary-color)';
    trail.style.pointerEvents = 'none';
    trail.style.left = mouseX + 'px';
    trail.style.top = mouseY + 'px';
    trail.style.opacity = '0.6';
    trail.style.transition = 'all 0.3s ease';
    trail.style.zIndex = '9999';
    
    document.body.appendChild(trail);
    cursorTrail.push(trail);
    
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0)';
    }, 100);
    
    setTimeout(() => {
        if (trail.parentNode) trail.remove();
        const idx = cursorTrail.indexOf(trail);
        if (idx > -1) cursorTrail.splice(idx, 1);
    }, 400);
}

// Throttle cursor trail creation
let lastTrailTime = 0;
document.addEventListener('mousemove', () => {
    const now = Date.now();
    if (now - lastTrailTime > 50) {
        createCursorTrail();
        lastTrailTime = now;
    }
});

// Note: .nav-link.active styles are now in styles.css (no dynamic injection needed)

console.log('🔐 Portfolio loaded successfully! Happy hacking! 🚀');

document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const cursor = document.querySelector('.custom-cursor');

    // Custom Cursor Movement
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.opacity = '1';
    });

    // Cursor Hover States
    const interactives = document.querySelectorAll('a, button, .btn, .add-btn, .menu-toggle');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            scrollTopBtn.classList.add('active');
        } else {
            navbar.classList.remove('scrolled');
            scrollTopBtn.classList.remove('active');
        }
    });

    // Scroll to Top
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        // Add mobile styling for nav links when active
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(15, 15, 15, 0.98)';
            navLinks.style.padding = '2rem';
            navLinks.style.borderBottom = '1px solid var(--primary)';
        }
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    // Apply animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal-init');
        observer.observe(section);
    });

    // Handle "Add to Cart" Feedback
    const addBtns = document.querySelectorAll('.add-btn');
    addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = '#4CAF50';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-plus"></i>';
                btn.style.background = 'var(--primary)';
            }, 2000);
        });
    });
});

// CSS for reveal animation (integrated via JS for better control)
const style = document.createElement('style');
style.textContent = `
    .reveal-init {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .reveal {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

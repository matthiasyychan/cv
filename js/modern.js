// Modern JavaScript for 2026 CV Website

class ModernCV {
    constructor() {
        this.init();
    }

    init() {
        this.setupDarkMode();
        this.setupSmoothScrolling();
        this.setupAnimations();
        this.setupAccessibility();
        this.setupContactForm();
    }

    setupDarkMode() {
        // Create dark mode toggle button
        const navbar = document.querySelector('.navbar-nav');
        if (navbar) {
            const darkModeToggle = document.createElement('li');
            darkModeToggle.className = 'nav-item';
            darkModeToggle.innerHTML = `
                <button id="darkModeToggle" class="btn btn-link nav-link" aria-label="Toggle dark mode">
                    <i class="fas fa-moon" id="darkModeIcon"></i>
                </button>
            `;
            navbar.appendChild(darkModeToggle);

            // Setup dark mode functionality
            const toggle = document.getElementById('darkModeToggle');
            const icon = document.getElementById('darkModeIcon');

            // Check for saved theme preference
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.documentElement.setAttribute('data-bs-theme', 'dark');
                icon.className = 'fas fa-sun';
            }

            toggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-bs-theme');
                if (currentTheme === 'dark') {
                    document.documentElement.removeAttribute('data-bs-theme');
                    localStorage.setItem('theme', 'light');
                    icon.className = 'fas fa-moon';
                } else {
                    document.documentElement.setAttribute('data-bs-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                    icon.className = 'fas fa-sun';
                }
            });
        }
    }

    setupSmoothScrolling() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe cards and sections
        document.querySelectorAll('.card, .row-content').forEach(el => {
            observer.observe(el);
        });
    }

    setupAccessibility() {
        // Add ARIA labels where missing
        const accordions = document.querySelectorAll('.accordion-button');
        accordions.forEach(button => {
            if (!button.getAttribute('aria-expanded')) {
                button.setAttribute('aria-expanded', 'false');
            }
        });

        // Keyboard navigation for cards
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const focusedElement = document.activeElement;
                if (focusedElement.classList.contains('card')) {
                    focusedElement.click();
                }
            }
        });
    }

    setupContactForm() {
        const form = document.querySelector('form[action^="mailto"]');
        if (form) {
            form.addEventListener('submit', (e) => {
                // Modern form handling with validation
                const name = form.querySelector('#name').value.trim();
                const email = form.querySelector('#emailid').value.trim();
                const feedback = form.querySelector('#feedback').value.trim();

                if (!name || !email || !feedback) {
                    e.preventDefault();
                    alert('Please fill in all fields');
                    return;
                }

                if (!this.isValidEmail(email)) {
                    e.preventDefault();
                    alert('Please enter a valid email address');
                    return;
                }

                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
            });
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModernCV();
});

// Add some CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Dark mode styles */
    [data-bs-theme="dark"] {
        --bs-body-color: #e9ecef;
        --bs-body-bg: #212529;
    }

    [data-bs-theme="dark"] .card {
        background-color: rgba(33, 37, 41, 0.8);
        border-color: rgba(255, 255, 255, 0.1);
    }

    [data-bs-theme="dark"] .footer {
        background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    }

    [data-bs-theme="dark"] .jumbotron {
        background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    }

    [data-bs-theme="dark"] .table {
        background-color: rgba(33, 37, 41, 0.8);
    }

    [data-bs-theme="dark"] .table thead th {
        background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
    }
`;
document.head.appendChild(style);

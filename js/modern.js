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
        // Select the SECOND navbar-nav (the one with social buttons, not the menu items)
        const navbars = document.querySelectorAll('.navbar-nav');
        const navbar = navbars[1]; // Second navbar-nav contains social buttons
        if (navbar) {
            const darkModeToggle = document.createElement('a');
            darkModeToggle.className = 'btn btn-link';
            darkModeToggle.id = 'darkModeToggle';
            darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
            darkModeToggle.innerHTML = '<i class="fas fa-moon" id="darkModeIcon"></i>';
            navbar.appendChild(darkModeToggle);

            // Setup dark mode functionality
            const toggle = document.getElementById('darkModeToggle');
            const icon = document.getElementById('darkModeIcon');

            // Check for saved theme preference or default to dark mode
            const savedTheme = localStorage.getItem('theme') || 'dark';
            if (savedTheme === 'light') {
                // Only set light mode if explicitly saved as light
                this.disableDarkMode();
                icon.className = 'fas fa-moon';
            } else {
                // Default to dark mode - apply immediately
                this.enableDarkMode();
                icon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'dark');
            }

            toggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-bs-theme');
                if (currentTheme === 'dark') {
                    this.disableDarkMode();
                    localStorage.setItem('theme', 'light');
                    icon.className = 'fas fa-moon';
                } else {
                    this.enableDarkMode();
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
                    
                    // Close mobile menu after clicking (for responsive navbar)
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        // Use Bootstrap's collapse method to properly close the menu
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
                        bsCollapse.hide();
                    }
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

    enableDarkMode() {
        // Apply Bootstrap dark theme
        document.documentElement.setAttribute('data-bs-theme', 'dark');

        // Force background change for body (darker version)
        document.body.style.background = 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #1a1a2e 100%) !important';
        document.body.style.color = '#ffffff !important';

        // Update all cards for dark mode
        document.querySelectorAll('.card').forEach(card => {
            card.style.setProperty('background-color', 'rgba(255, 255, 255, 0.05)', 'important');
            card.style.setProperty('border-color', 'rgba(255, 255, 255, 0.1)', 'important');
            card.style.setProperty('color', '#ffffff', 'important');
        });

        // Update navbar
        const navbar = document.querySelector('.navbar-dark');
        if (navbar) {
            navbar.style.setProperty('background', 'rgba(255, 255, 255, 0.05)', 'important');
            navbar.style.setProperty('color', '#ffffff', 'important');
        }

        // Update jumbotron
        const jumbotron = document.querySelector('.jumbotron');
        if (jumbotron) {
            jumbotron.style.setProperty('background', 'rgba(255, 255, 255, 0.05)', 'important');
            jumbotron.style.setProperty('color', '#ffffff', 'important');
        }

        // Update footer
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.style.setProperty('background', 'rgba(255, 255, 255, 0.05)', 'important');
            footer.style.setProperty('color', '#ffffff', 'important');
        }

        // Update form inputs for dark mode
        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.style.setProperty('background-color', 'rgba(255, 255, 255, 0.05)', 'important');
            input.style.setProperty('border-color', 'rgba(255, 255, 255, 0.2)', 'important');
            input.style.setProperty('color', '#ffffff', 'important');
        });

        // Update tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.style.setProperty('background', 'rgba(255, 255, 255, 0.05)', 'important');
            tab.style.setProperty('color', '#ffffff', 'important');
        });

        // Force ALL text elements to white with !important
        document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td, th, span, a, label, dt, dd, i, b, strong, em').forEach(el => {
            // Skip if it's a special styled element like the handwriting
            if (!el.classList.contains('handwriting') && !el.style.backgroundClip) {
                el.style.setProperty('color', '#ffffff', 'important');
            }
        });

        // Update table styling for dark mode
        document.querySelectorAll('.table, .table tbody, .table tbody tr, .table tbody td, .table tbody th').forEach(table => {
            table.style.setProperty('color', '#ffffff', 'important');
        });

        // Update card text specifically with !important
        document.querySelectorAll('.card-text, .card-body, .card-body *, .card-header, .card-header *').forEach(el => {
            if (!el.classList.contains('handwriting') && !el.classList.contains('badge')) {
                el.style.setProperty('color', '#ffffff', 'important');
            }
        });

        // Update all list items in cards
        document.querySelectorAll('.card ul li, .card ol li').forEach(li => {
            li.style.setProperty('color', '#ffffff', 'important');
        });

        // Update breadcrumb and other Bootstrap components
        document.querySelectorAll('.breadcrumb, .breadcrumb-item').forEach(el => {
            el.style.setProperty('color', '#ffffff', 'important');
        });

        // Force update all divs that might contain text
        document.querySelectorAll('div, section, article, aside').forEach(el => {
            if (el.textContent && !el.closest('.handwriting')) {
                el.style.setProperty('color', '#ffffff', 'important');
            }
        });
    }

    disableDarkMode() {
        // Remove Bootstrap dark theme
        document.documentElement.removeAttribute('data-bs-theme');

        // Set light mode with proper light background
        document.body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%) !important';
        document.body.style.color = '#2c3e50 !important';

        // Reset all cards for light mode with dark text
        document.querySelectorAll('.card').forEach(card => {
            card.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            card.style.borderColor = 'rgba(0, 0, 0, 0.1)';
            card.style.setProperty('color', '#2c3e50', 'important');
        });

        // Reset navbar for light mode
        const navbar = document.querySelector('.navbar-dark');
        if (navbar) {
            navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important';
            navbar.style.color = '#ffffff !important';
        }

        // Reset jumbotron for light mode
        const jumbotron = document.querySelector('.jumbotron');
        if (jumbotron) {
            jumbotron.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important';
            jumbotron.style.color = '#ffffff !important';
        }

        // Reset footer for light mode
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important';
            footer.style.color = '#ffffff !important';
        }

        // Reset form inputs for light mode with dark text
        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.style.backgroundColor = '#ffffff';
            input.style.borderColor = '#ced4da';
            input.style.setProperty('color', '#2c3e50', 'important');
        });

        // Reset tabs for light mode with dark text
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.style.background = 'rgba(255, 255, 255, 0.9)';
            tab.style.setProperty('color', '#2c3e50', 'important');
        });

        // Force ALL text elements to dark color for light mode with !important
        document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td, th, span, a, label, dt, dd, i, b, strong, em').forEach(el => {
            // Keep navbar, footer, and jumbotron text white
            if (!el.closest('.jumbotron') && !el.closest('.footer') && !el.closest('.navbar')) {
                // Skip if it's a special styled element like the handwriting
                if (!el.classList.contains('handwriting') && !el.style.backgroundClip) {
                    el.style.setProperty('color', '#2c3e50', 'important');
                }
            }
        });

        // Reset card text specifically with !important
        document.querySelectorAll('.card-text, .card-body, .card-body *, .card-header, .card-header *').forEach(el => {
            if (!el.classList.contains('handwriting') && !el.classList.contains('badge')) {
                el.style.setProperty('color', '#2c3e50', 'important');
            }
        });

        // Reset all list items in cards
        document.querySelectorAll('.card ul li, .card ol li').forEach(li => {
            li.style.setProperty('color', '#2c3e50', 'important');
        });

        // Reset breadcrumb and other Bootstrap components
        document.querySelectorAll('.breadcrumb, .breadcrumb-item').forEach(el => {
            el.style.setProperty('color', '#2c3e50', 'important');
        });

        // Force update all divs that might contain text
        document.querySelectorAll('div, section, article, aside').forEach(el => {
            if (el.textContent && !el.closest('.handwriting') && !el.closest('.jumbotron') && !el.closest('.footer') && !el.closest('.navbar')) {
                el.style.setProperty('color', '#2c3e50', 'important');
            }
        });

        // Update table styling for light mode
        document.querySelectorAll('.table, .table tbody, .table tbody tr, .table tbody td, .table tbody th').forEach(table => {
            if (!table.closest('.jumbotron') && !table.closest('.footer')) {
                table.style.setProperty('color', '#2c3e50', 'important');
            }
        });

        // Update table headers that aren't in navbar/footer/jumbotron
        document.querySelectorAll('.table thead th').forEach(th => {
            th.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            th.style.color = '#ffffff';
        });
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

    /* Enhanced dark mode styles */
    [data-bs-theme="dark"] {
        --bs-body-color: #ffffff;
        --bs-body-bg: #0a0a0f;
    }

    [data-bs-theme="dark"] body {
        background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #1a1a2e 100%) !important;
        color: #ffffff !important;
    }

    [data-bs-theme="dark"] body::before {
        background:
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%);
    }

    [data-bs-theme="dark"] body::after {
        background-image:
            linear-gradient(rgba(0, 212, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.02) 1px, transparent 1px);
    }

    [data-bs-theme="dark"] .card {
        background: rgba(255, 255, 255, 0.05) !important;
        border-color: rgba(255, 255, 255, 0.1) !important;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(255, 107, 107, 0.2) !important;
        color: #ffffff !important;
    }

    [data-bs-theme="dark"] .footer {
        background: rgba(255, 255, 255, 0.05) !important;
        border-color: rgba(255, 255, 255, 0.1) !important;
        color: #ffffff !important;
    }

    [data-bs-theme="dark"] .jumbotron {
        background: rgba(255, 255, 255, 0.05) !important;
        border-color: rgba(255, 255, 255, 0.1) !important;
        color: #ffffff !important;
    }

    [data-bs-theme="dark"] .table {
        background: rgba(255, 255, 255, 0.05) !important;
        border-color: rgba(255, 255, 255, 0.1) !important;
        color: #ffffff !important;
    }

    [data-bs-theme="dark"] .table thead th {
        background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%) !important;
        color: white !important;
    }

    [data-bs-theme="dark"] .navbar-dark {
        background: rgba(255, 255, 255, 0.05) !important;
        border-color: rgba(255, 255, 255, 0.1) !important;
    }

    [data-bs-theme="dark"] .tab-content {
        background: rgba(255, 255, 255, 0.05) !important;
        border-color: rgba(255, 255, 255, 0.1) !important;
        color: #ffffff !important;
    }

    /* Form inputs in dark mode */
    [data-bs-theme="dark"] input,
    [data-bs-theme="dark"] textarea,
    [data-bs-theme="dark"] select {
        background-color: rgba(255, 255, 255, 0.05) !important;
        border-color: rgba(255, 255, 255, 0.2) !important;
        color: #ffffff !important;
    }

    [data-bs-theme="dark"] input::placeholder,
    [data-bs-theme="dark"] textarea::placeholder {
        color: rgba(255, 255, 255, 0.6) !important;
    }

    [data-bs-theme="dark"] .form-control:focus {
        background-color: rgba(255, 255, 255, 0.1) !important;
        border-color: rgba(0, 212, 255, 0.5) !important;
        color: #ffffff !important;
        box-shadow: 0 0 0 0.2rem rgba(0, 212, 255, 0.25) !important;
    }

    /* Links and text in dark mode */
    [data-bs-theme="dark"] a {
        color: #00d4ff !important;
    }

    [data-bs-theme="dark"] a:hover {
        color: #ff6b6b !important;
        text-shadow: 0 0 10px rgba(255, 107, 107, 0.5) !important;
    }

    [data-bs-theme="dark"] h2 {
        color: #ffffff !important;
        text-shadow: 0 0 10px rgba(0, 212, 255, 0.5) !important;
    }

    /* Button styling in dark mode */
    [data-bs-theme="dark"] .btn {
        border-color: rgba(255, 255, 255, 0.2) !important;
        color: #ffffff !important;
    }

    [data-bs-theme="dark"] .btn-primary {
        background: linear-gradient(45deg, #00d4ff 0%, #090979 50%, #00d4ff 100%) !important;
        border-color: rgba(0, 212, 255, 0.5) !important;
    }

    [data-bs-theme="dark"] .btn-primary:hover {
        background: linear-gradient(45deg, #ff6b6b 0%, #ffa500 100%) !important;
        border-color: rgba(255, 107, 107, 0.8) !important;
    }
`;
document.head.appendChild(style);

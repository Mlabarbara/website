//main.js begin
// Theme toggle functionality

function setDarkMode(isDark) {
    if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    }
}

// Initialize theme
function initializeTheme() {
    // Set initial dark mode state
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }

    // Add event listeners for theme toggles
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('theme-toggle-mobile');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setDarkMode(!document.documentElement.classList.contains('dark'));
        });
    }

    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', () => {
            setDarkMode(!document.documentElement.classList.contains('dark'));
        });
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.theme) {
            setDarkMode(e.matches);
        }
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Animation functionality
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fade-in');
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
}

// Resume modal functionality
function openFullScreenResume() {
    const modal = document.getElementById('resumeModal');
    if (modal) {
        modal.showModal();
        document.body.style.overflow = 'hidden';
        
        // Force the PDF to fit the viewport initially
        const embed = modal.querySelector('embed');
        if (embed) {
            embed.setAttribute('src', embed.getAttribute('src').split('#')[0] + '#view=Fit');
        }
    }
}

function closeFullScreenResume() {
    const modal = document.getElementById('resumeModal');
    if (modal) {
        modal.close();
        document.body.style.overflow = '';
    }
}

// Initialize resume modal
function initializeResumeModal() {
    const modal = document.getElementById('resumeModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            const rect = modal.getBoundingClientRect();
            const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.bottom &&
                rect.left <= e.clientX && e.clientX <= rect.right);
            if (!isInDialog) {
                closeFullScreenResume();
            }
        });
    }
}

// Add to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeMobileMenu();
    initializeAnimations();
    initializeResumeModal();
});
//main.js end
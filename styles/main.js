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
    // Check for saved theme preference or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }

    // Theme toggle event listeners
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
        setDarkMode(!document.documentElement.classList.contains('dark'));
    });

    document.getElementById('theme-toggle-mobile')?.addEventListener('click', () => {
        setDarkMode(!document.documentElement.classList.contains('dark'));
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeMobileMenu();
});
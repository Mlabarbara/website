// Immediate theme initialization
const prefersDark = localStorage.theme === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

if (prefersDark) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

export function setDarkMode(isDark) {
    if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    }
}

export function initializeTheme() {
    console.log('Initializing theme system');
    
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('theme-toggle-mobile');
    
    const setupToggle = (element) => {
        if (element) {
            console.log(`Setting up theme toggle: ${element.id}`);
            element.addEventListener('click', () => {
                const isDark = !document.documentElement.classList.contains('dark');
                setDarkMode(isDark);
                console.log(`Theme toggled to: ${isDark ? 'dark' : 'light'}`);
            });
        }
    };

    // Setup both toggles
    setupToggle(themeToggle);
    setupToggle(mobileThemeToggle);

    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.theme) {
            setDarkMode(e.matches);
        }
    });
}
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
    // Set theme immediately
    const prefersDark = localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', prefersDark);

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

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.theme) {
            setDarkMode(e.matches);
        }
    });
}
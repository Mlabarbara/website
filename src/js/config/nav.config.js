export const navItems = [
    { href: '/pages/index.html', text: 'Home' },
    { href: '/pages/blog.html', text: 'Blog' },
    { href: '/pages/github.html', text: 'GitHub' },
    { href: '/pages/projects.html', text: 'Projects' },
    { href: '/pages/contact.html', text: 'Contact' }
];

export function generateNavItems() {
    // Desktop navigation
    const desktopNav = document.querySelector('nav .hidden.md\\:flex.items-center.space-x-8');
    
    if (desktopNav) {
        // Clear existing items
        desktopNav.innerHTML = '';
        
        // Add navigation items
        navItems.forEach(item => {
            const link = document.createElement('a');
            link.href = item.href;
            link.className = 'nav-link text-white hover:text-blue-200 transition-all duration-200';
            link.textContent = item.text;
            desktopNav.appendChild(link);
        });

        // Add theme toggle button for desktop
        const themeToggleDesktop = createThemeToggleButton();
        desktopNav.appendChild(themeToggleDesktop);
    }

    // Mobile navigation
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenu) {
        // Clear existing items
        mobileMenu.innerHTML = '';
        
        // Add navigation items
        navItems.forEach(item => {
            const link = document.createElement('a');
            link.href = item.href;
            link.className = 'block px-4 py-2 text-white hover:bg-blue-800 dark:hover:bg-gray-700 transition-all duration-200';
            link.textContent = item.text;
            mobileMenu.appendChild(link);
        });

        // Add theme toggle button for mobile
        const themeToggleMobile = createThemeToggleButton();
        mobileMenu.appendChild(themeToggleMobile);
    }
}

function createThemeToggleButton() {
    const button = document.createElement('button');
    button.id = 'theme-toggle';
    button.className = 'p-2 text-white hover:bg-blue-800 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200';
    
    button.innerHTML = `
        <svg class="w-6 h-6 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
        <svg class="w-6 h-6 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
    `;
    
    return button;
}
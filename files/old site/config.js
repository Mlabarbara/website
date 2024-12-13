// Navigation configuration
const navItems = [
    { href: 'index.html', text: 'Home' },
    { href: 'projects.html', text: 'Projects' },
    { href: 'contact.html', text: 'Contact' },
    { href: 'github.html', text: 'GitHub' },
    { href: 'blog.html', text: 'Blog' }
];

// Function to generate navigation HTML
function generateNavItems() {
    const desktopNav = document.querySelector('.md\\:flex.items-center.space-x-8');
    const mobileNav = document.getElementById('mobile-menu');
    
    // Generate desktop nav items
    navItems.forEach(item => {
        const link = document.createElement('a');
        link.href = item.href;
        link.className = 'nav-link text-white hover:text-blue-200';
        link.textContent = item.text;
        desktopNav.appendChild(link);
    });

    // Generate mobile nav items
    navItems.forEach(item => {
        const link = document.createElement('a');
        link.href = item.href;
        link.className = 'block px-4 py-2 text-white hover:bg-blue-800 dark:hover:bg-gray-700 rounded-lg';
        link.textContent = item.text;
        mobileNav.appendChild(link);
    });

    // Add theme toggle button to desktop nav
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.className = 'p-2 text-white hover:bg-blue-800 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200';
    themeToggle.innerHTML = `
        <svg class="w-6 h-6 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
        <svg class="w-6 h-6 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
    `;
    desktopNav.appendChild(themeToggle);
}

// Export for use in other files
export { generateNavItems };
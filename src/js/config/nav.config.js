export const navItems = [
    { href: '/pages/index.html', text: 'Home' },
    { href: '/pages/projects.html', text: 'Projects' },
    { href: '/pages/contact.html', text: 'Contact' },
    { href: '/pages/github.html', text: 'GitHub' },
    { href: '/pages/blog.html', text: 'Blog' }
];

export function generateNavItems() {
    // More flexible selector
    const desktopNav = document.querySelector('nav .desktop-menu') || 
                      document.querySelector('.hidden.md\\:flex') ||
                      document.querySelector('[data-nav="desktop"]');
    
    console.log('Attempting to generate nav items');
    console.log('Desktop nav found:', desktopNav);
    
    if (!desktopNav) {
        console.error('Desktop nav not found - retrying in 100ms');
        setTimeout(generateNavItems, 100); // Retry if not found
        return;
    }
    
    // Clear existing items
    desktopNav.innerHTML = '';
    
    // Add navigation items
    navItems.forEach(item => {
        const link = document.createElement('a');
        link.href = item.href;
        link.className = 'nav-link text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200';
        link.setAttribute('data-nav-link', '');
        link.textContent = item.text;
        desktopNav.appendChild(link);
    });
}
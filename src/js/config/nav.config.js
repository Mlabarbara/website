export const navItems = [
    { href: '/pages/index.html', text: 'Home' },
    { href: '/pages/projects.html', text: 'Projects' },
    { href: '/pages/contact.html', text: 'Contact' },
    { href: '/pages/github.html', text: 'GitHub' },
    { href: '/pages/blog.html', text: 'Blog' }
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
            link.className = 'text-white hover:text-blue-200 transform hover:scale-105 transition-all duration-200';
            link.textContent = item.text;
            desktopNav.appendChild(link);
        });
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
            link.className = 'block px-4 py-2 text-white hover:bg-blue-800 dark:hover:bg-gray-700 transform hover:scale-105 transition-all duration-200';
            link.textContent = item.text;
            mobileMenu.appendChild(link);
        });
    }
}
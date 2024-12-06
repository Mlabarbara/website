export const navItems = [
    { href: '/pages/index.html', text: 'Home' },
    { href: '/pages/projects.html', text: 'Projects' },
    { href: '/pages/contact.html', text: 'Contact' },
    { href: '/pages/github.html', text: 'GitHub' },
    { href: '/pages/blog.html', text: 'Blog' }
];

export function generateNavItems() {
    const desktopNav = document.querySelector('.hidden.md\\:flex.items-center.space-x-8');
    console.log('Desktop nav found:', desktopNav);
    
    if (!desktopNav) {
        console.error('Desktop nav not found');
        return;
    }
    
    // Clear existing items
    desktopNav.innerHTML = '';
    
    // Add navigation items
    navItems.forEach(item => {
        const link = document.createElement('a');
        link.href = item.href;
        link.className = 'text-white hover:text-blue-200';
        link.textContent = item.text;
        desktopNav.appendChild(link);
    });
}
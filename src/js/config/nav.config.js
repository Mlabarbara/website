export const navItems = [
    { href: '/pages/index.html', text: 'Home' },
    { href: '/pages/projects.html', text: 'Projects' },
    { href: '/pages/contact.html', text: 'Contact' },
    { href: '/pages/github.html', text: 'GitHub' },
    { href: '/pages/blog.html', text: 'Blog' }
];

export function generateNavItems() {
    console.log('Generating nav items...');
    const desktopNav = document.querySelector('div.hidden.md\\:flex.items-center.space-x-8');
    const mobileNav = document.getElementById('mobile-menu');
    
    console.log('desktopNav:', desktopNav);
    console.log('mobileNav:', mobileNav);

    if (!desktopNav || !mobileNav){
        console.error('One or more nav elements not found.');
        return;
    } 


    // Clear existing items
    desktopNav.innerHTML = '';
    mobileNav.innerHTML = '';
    
    // Generate nav items
    navItems.forEach(item => {
        // Desktop nav
        const deskLink = document.createElement('a');
        deskLink.href = item.href;
        deskLink.className = 'nav-link text-white hover:text-blue-200';
        deskLink.textContent = item.text;
        desktopNav.appendChild(deskLink);

        // Mobile nav
        const mobLink = document.createElement('a');
        mobLink.href = item.href;
        mobLink.className = 'block px-4 py-2 text-white hover:bg-blue-800 dark:hover:bg-gray-700 rounded-lg';
        mobLink.textContent = item.text;
        mobileNav.appendChild(mobLink);
    });

    // Add theme toggle
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.className = 'p-2 text-white hover:bg-blue-800 dark:hover:bg-gray-700 rounded-lg';
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
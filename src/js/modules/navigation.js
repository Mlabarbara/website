export function initializeNavigation() {
    console.log('Initializing navigation...');
    
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        console.log('Mobile menu elements found');
        
        mobileMenuButton.addEventListener('click', () => {
            console.log('Mobile menu button clicked');
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
            } else {
                mobileMenu.classList.add('hidden');
            }
        });
    } else {
        console.error('Mobile menu elements not found:', { 
            button: !!mobileMenuButton, 
            menu: !!mobileMenu 
        });
    }
}
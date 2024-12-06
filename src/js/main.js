import { initializeTheme } from './modules/theme.js';
import { generateNavItems } from './config/nav.config.js';
import { initializeNavigation } from './modules/navigation.js';

console.log('Main module loading...');

// Initialize everything in the correct order
try {
    // First generate navigation items
    generateNavItems();
    console.log('Navigation items generated');

    // Then initialize mobile menu functionality
    initializeNavigation();
    console.log('Navigation initialized');

    // Finally initialize theme system
    initializeTheme();
    console.log('Theme system initialized');
} catch (error) {
    console.error('Error during initialization:', error);
}

// Export for use in other modules if needed
export { generateNavItems, initializeNavigation, initializeTheme };
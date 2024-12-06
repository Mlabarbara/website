import { initializeTheme } from './modules/theme.js';
import { generateNavItems } from './config/nav.config.js';
import { initializeNavigation } from './modules/navigation.js';

// Initialize everything in the correct order
try {
    generateNavItems();
    initializeNavigation();
    initializeTheme();
} catch (error) {
    console.error('Error during initialization:', error);
}

// Export for use in other modules if needed
export { generateNavItems, initializeNavigation, initializeTheme };
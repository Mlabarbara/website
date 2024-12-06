import { initializeTheme } from './modules/theme.js';
import { initializeMobileMenu } from './modules/navigation.js';
import { initializeAnimations } from './modules/animations.js';
import { generateNavItems } from './config/nav.config.js';

document.addEventListener('DOMContentLoaded', () => {
    generateNavItems();
    initializeTheme();
    initializeMobileMenu();
    initializeAnimations();
});
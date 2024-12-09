export function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fade-in');
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
}
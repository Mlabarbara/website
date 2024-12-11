function toggleSection(sectionId) {
    const content = document.getElementById(`${sectionId}-content`);
    const arrow = document.getElementById(`${sectionId}-arrow`);
    
    content.classList.toggle('hidden');
    arrow.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
}

document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.installation-step');
    
    // Intersection Observer for scroll-based animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });

    steps.forEach(step => {
        observer.observe(step);
        
        const header = step.querySelector('div:first-child');
        const content = step.querySelector('.installation-content');
        const arrow = step.querySelector('svg');
        
        header.addEventListener('click', () => {
            const isOpen = !content.classList.contains('hidden');
            
            // Close all other sections
            steps.forEach(otherStep => {
                if (otherStep !== step) {
                    otherStep.querySelector('.installation-content').classList.add('hidden');
                    otherStep.querySelector('svg').style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current section
            content.classList.toggle('hidden');
            arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        });
    });
});
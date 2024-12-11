function toggleSection(sectionId) {
    const content = document.getElementById(`${sectionId}-content`);
    const arrow = document.getElementById(`${sectionId}-arrow`);
    
    content.classList.toggle('hidden');
    arrow.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
}

document.addEventListener('DOMContentLoaded', () => {
    // Existing installation steps functionality
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

    // New prerequisites functionality
    const previews = document.querySelectorAll('.prereq-preview');
    previews.forEach(preview => {
        const header = preview.querySelector('div');
        const content = preview.querySelector('.prereq-content');
        const viewText = preview.querySelector('span');

        header.addEventListener('click', () => {
            // Toggle content visibility with animation
            content.classList.toggle('hidden');
            
            // Update view/hide text
            viewText.textContent = content.classList.contains('hidden') ? 'View Details' : 'Hide Details';
            
            // Add slide animation
            if (!content.classList.contains('hidden')) {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
            } else {
                content.style.maxHeight = '0';
                content.style.opacity = '0';
            }
        });
    });

    // Add scroll-based animations for prerequisites
    previews.forEach(preview => observer.observe(preview)); // We can reuse the same observer
});
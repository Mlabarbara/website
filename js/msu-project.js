document.addEventListener('DOMContentLoaded', () => {
    // Installation steps animation
    const steps = document.querySelectorAll('.installation-step');
    
    // Create an observer instance for each step
    const observers = new Map();
    
    steps.forEach((step, index) => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    // Get current intersection ratio
                    const ratio = entry.intersectionRatio;
                    
                    // Don't apply opacity changes if content is expanded
                    const content = entry.target.querySelector('.installation-content');
                    if (content && !content.classList.contains('hidden')) {
                        entry.target.style.opacity = 1;
                        return;
                    }
                    
                    // Calculate opacity and transform based on intersection ratio
                    const opacity = Math.min(ratio * 3, 1);
                    const translateY = 20 - (ratio * 20); // Start at 20px up, move to 0
                    
                    // Apply smooth transitions
                    entry.target.style.opacity = opacity;
                    entry.target.style.transform = `translateY(${translateY}px)`;
                });
            },
            {
                threshold: Array(100).fill().map((_, i) => i / 100),
                rootMargin: '0px 0px -2% 0px'
            }
        );
        
        observer.observe(step);
        observers.set(step, observer);
        
        // Accordion functionality
        const header = step.querySelector('div:first-child');
        const content = step.querySelector('.installation-content');
        const arrow = step.querySelector('svg');
        
        if (header && content && arrow) {
            header.addEventListener('click', () => {
                const isOpen = !content.classList.contains('hidden');
                
                // First, ensure the clicked element is fully opaque
                step.style.opacity = '1';
                
                // Scroll the header to top of viewport when opened
                if (!isOpen) {
                    // Add a small delay to allow for smooth animation
                    setTimeout(() => {
                        header.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
                
                // Close all other sections
                steps.forEach(otherStep => {
                    if (otherStep !== step) {
                        const otherContent = otherStep.querySelector('.installation-content');
                        const otherArrow = otherStep.querySelector('svg');
                        if (otherContent && otherArrow) {
                            otherContent.classList.add('hidden');
                            otherArrow.style.transform = 'rotate(0deg)';
                        }
                    }
                });
                
                // Toggle current section
                content.classList.toggle('hidden');
                arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
                
                // Set appropriate max-height for animation
                if (!isOpen) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = '0';
                }
            });
        }
    });

    // Prerequisites functionality
    const previews = document.querySelectorAll('.prereq-preview');
    previews.forEach(preview => {
        const previewHeader = preview.querySelector('.flex');
        const header = preview.querySelector('.prereq-header');
        const content = preview.querySelector('.prereq-content');
        const viewText = preview.querySelector('span');

        if (previewHeader && header && content && viewText) {
            previewHeader.addEventListener('click', () => {
                content.classList.toggle('hidden');
                header.classList.toggle('active');
                viewText.textContent = content.classList.contains('hidden') ? 'View Details' : 'Hide Details';

                if (!content.classList.contains('hidden')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.opacity = '1';
                    
                    previews.forEach(otherPreview => {
                        if (otherPreview !== preview) {
                            const otherContent = otherPreview.querySelector('.prereq-content');
                            const otherHeader = otherPreview.querySelector('.prereq-header');
                            const otherViewText = otherPreview.querySelector('span');
                            if (otherContent && otherHeader && otherViewText) {
                                otherContent.classList.add('hidden');
                                otherHeader.classList.remove('active');
                                otherContent.style.maxHeight = '0';
                                otherContent.style.opacity = '0';
                                otherViewText.textContent = 'View Details';
                            }
                        }
                    });
                } else {
                    content.style.maxHeight = '0';
                    content.style.opacity = '0';
                }
            });
        }
    });
});
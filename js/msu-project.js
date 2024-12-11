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

    // Prerequisites functionality
    const previews = document.querySelectorAll('.prereq-preview');
    previews.forEach(preview => {
        const previewHeader = preview.querySelector('.flex');  // The always-visible part
        const header = preview.querySelector('.prereq-header');
        const content = preview.querySelector('.prereq-content');
        const viewText = preview.querySelector('span');

        previewHeader.addEventListener('click', () => {
            // Toggle content visibility with animation
            content.classList.toggle('hidden');
            
            // Toggle active state for the header
            header.classList.toggle('active');
            
            // Update view/hide text
            viewText.textContent = content.classList.contains('hidden') ? 'View Details' : 'Hide Details';
            
            // Add slide animation
            if (!content.classList.contains('hidden')) {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                
                // Close other sections and remove their active states
                previews.forEach(otherPreview => {
                    if (otherPreview !== preview) {
                        const otherContent = otherPreview.querySelector('.prereq-content');
                        const otherHeader = otherPreview.querySelector('.prereq-header');
                        const otherViewText = otherPreview.querySelector('span');
                        
                        otherContent.classList.add('hidden');
                        otherHeader.classList.remove('active');
                        otherContent.style.maxHeight = '0';
                        otherContent.style.opacity = '0';
                        otherViewText.textContent = 'View Details';
                    }
                });
            } else {
                content.style.maxHeight = '0';
                content.style.opacity = '0';
            }
        });

        // Add hover effects to the parent element
        previewHeader.addEventListener('mouseenter', () => {
            header.classList.add('hover');
        });

        previewHeader.addEventListener('mouseleave', () => {
            if (!content.classList.contains('active')) {
                header.classList.remove('hover');
            }
        });
    });

    // Add scroll-based animations for prerequisites
    previews.forEach(preview => observer.observe(preview)); // We can reuse the same observer
});
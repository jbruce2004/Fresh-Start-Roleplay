// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handle character form submission
    const characterForm = document.getElementById('characterForm');
    if (characterForm) {
        characterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const charName = document.getElementById('charName').value;
            const charClass = document.getElementById('charClass').value;
            const charBio = document.getElementById('charBio').value;
            
            // Create character object
            const character = {
                name: charName,
                class: charClass,
                bio: charBio
            };
            
            // In a real application, you would send this data to a server
            console.log('Character created:', character);
            
            // Show success message
            alert('Character created successfully!');
            
            // Reset form
            characterForm.reset();
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to rule cards on scroll
    const ruleCards = document.querySelectorAll('.rule-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    ruleCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Handle CTA button click
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Scroll to character creation section
            const characterSection = document.getElementById('characters');
            if (characterSection) {
                characterSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    const whitelistForm = document.querySelector('.whitelist-form');
    
    if (whitelistForm) {
        whitelistForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(whitelistForm);
            const data = Object.fromEntries(formData.entries());
            
            try {
                const response = await fetch('/api/whitelist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    alert('Application submitted successfully! We will review it and contact you soon.');
                    whitelistForm.reset();
                } else {
                    throw new Error(result.message || 'Failed to submit application');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error submitting your application. Please try again or contact staff.');
            }
        });
    }
}); 
// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = 'none';
    }
});

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = formatNumber(target);
                clearInterval(timer);
            } else {
                counter.textContent = formatNumber(Math.floor(current));
            }
        }, 16);
    });
}

// Format numbers with Bengali digits
function formatNumber(num) {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().replace(/\d/g, digit => bengaliDigits[digit]);
}

// Progress Bar Animation
function animateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const collectionAmount = document.getElementById('collectionAmount');
    
    const targetAmount = 500000;
    const currentAmount = parseInt(collectionAmount.getAttribute('data-count'));
    const percentage = (currentAmount / targetAmount) * 100;
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${progress}% লক্ষ্য অর্জিত`;
        
        if (progress >= percentage) {
            clearInterval(interval);
        }
    }, 20);
}

// FAQ Accordion
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Partners Slider Animation
function initializePartnersSlider() {
    const track = document.querySelector('.partners-track');
    const logos = document.querySelectorAll('.partner-logo');
    
    // Duplicate logos for seamless loop
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        track.appendChild(clone);
    });
}

// Scroll to Donate Section
function scrollToDonate() {
    document.getElementById('donate').scrollIntoView({
        behavior: 'smooth'
    });
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinksArray = document.querySelectorAll('.nav-link');
    navLinksArray.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('show');
            }
        });
    });
}

// Intersection Observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.crisis-card, .trust-item, .impact-card, .testimonial-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Real-time collection amount update (simulated)
function simulateRealTimeDonations() {
    const collectionAmount = document.getElementById('collectionAmount');
    let currentAmount = parseInt(collectionAmount.getAttribute('data-count'));
    
    // Simulate new donations every 30 seconds
    setInterval(() => {
        const randomDonation = Math.floor(Math.random() * 50) + 10;
        currentAmount += randomDonation;
        
        // Ensure we don't exceed target
        if (currentAmount > 500000) {
            currentAmount = 500000;
        }
        
        collectionAmount.setAttribute('data-count', currentAmount);
        collectionAmount.textContent = formatNumber(currentAmount);
        
        // Update progress bar
        const targetAmount = 500000;
        const percentage = (currentAmount / targetAmount) * 100;
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `${Math.round(percentage)}% লক্ষ্য অর্জিত`;
    }, 30000);
}

// Smooth scrolling for all anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeFAQ();
    initializePartnersSlider();
    initializeAnimations();
    
    // Initialize counters and progress bar after a delay
    setTimeout(() => {
        animateCounters();
        animateProgressBar();
    }, 1000);
    
    // Start real-time donation simulation after 5 seconds
    setTimeout(simulateRealTimeDonations, 5000);
    
    // Add click event to urgent alert button
    const urgentAlertBtn = document.querySelector('.urgent-alert-btn');
    if (urgentAlertBtn) {
        urgentAlertBtn.addEventListener('click', scrollToDonate);
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .crisis-card.animate-in,
    .trust-item.animate-in,
    .impact-card.animate-in,
    .testimonial-card.animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .nav-links {
        transition: all 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
        
        .nav-links.show {
            display: flex;
        }
    }
`;
document.head.appendChild(style);

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.log('Error occurred:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
    console.log('Page load time:', loadTime + 'ms');
});

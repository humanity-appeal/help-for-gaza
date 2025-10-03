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
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText.replace(/,/g, '');
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment).toLocaleString('bn-BD');
            setTimeout(() => animateCounters(), 1);
        } else {
            counter.innerText = target.toLocaleString('bn-BD');
        }
    });
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
document.addEventListener('DOMContentLoaded', function() {
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
});

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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize counters and progress bar after a delay
    setTimeout(() => {
        animateCounters();
        animateProgressBar();
    }, 2000);
    
    initializePartnersSlider();
    
    // Add click event to urgent alert button
    const urgentAlertBtn = document.querySelector('.urgent-alert-btn');
    if (urgentAlertBtn) {
        urgentAlertBtn.addEventListener('click', scrollToDonate);
    }
    
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinksArray = document.querySelectorAll('.nav-link');
    navLinksArray.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.crisis-card, .trust-item, .impact-card, .testimonial-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Real-time collection amount update (simulated)
function simulateRealTimeDonations() {
    const collectionAmount = document.getElementById('collectionAmount');
    let currentAmount = parseInt(collectionAmount.getAttribute('data-count'));
    
    // Simulate new donations every 30 seconds
    setInterval(() => {
        const randomDonation = Math.floor(Math.random() * 100) + 10;
        currentAmount += randomDonation;
        collectionAmount.setAttribute('data-count', currentAmount);
        collectionAmount.textContent = currentAmount.toLocaleString('bn-BD');
        
        // Update progress bar
        const targetAmount = 500000;
        const percentage = (currentAmount / targetAmount) * 100;
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `${Math.round(percentage)}% লক্ষ্য অর্জিত`;
    }, 30000);
}

// Start real-time donation simulation
setTimeout(simulateRealTimeDonations, 5000);

// Add smooth scrolling for all anchor links
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

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.log('Error occurred:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
    console.log('Page load time:', loadTime + 'ms');
});

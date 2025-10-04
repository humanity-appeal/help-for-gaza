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

// Fund Collection System
class FundCollection {
    constructor() {
        this.targetAmount = 500000;
        this.currentAmount = 184250; // More natural looking amount
        this.init();
    }

    init() {
        this.animateAllNumbers();
        this.startRealTimeUpdates();
        this.initializePartnersSlider();
    }

    animateAllNumbers() {
        // Animate collection amount
        this.animateCounter('collectionAmount', this.currentAmount, 2000);
        
        // Animate other stats
        const daysLeft = this.getDaysUntilMonthEnd();
        this.animateCounter('[data-count="25"]', daysLeft, 1500);
        
        // Animate target amount
        this.animateCounter('[data-count="500000"]', 500000, 1800);
    }

    animateCounter(selector, target, duration) {
        const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (!element) return;
        
        const start = 0;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = this.formatToBengaliDigits(target);
                clearInterval(timer);
            } else {
                element.textContent = this.formatToBengaliDigits(Math.floor(current));
            }
        }, 16);
    }

    getDaysUntilMonthEnd() {
        const now = new Date();
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const diffTime = endOfMonth - now;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    startRealTimeUpdates() {
        // Update progress bar
        this.updateProgressBar();
        
        // Real-time donation simulation
        setInterval(() => {
            const randomIncrement = Math.floor(Math.random() * 80) + 20;
            this.currentAmount += randomIncrement;
            
            if (this.currentAmount > this.targetAmount) {
                this.currentAmount = this.targetAmount;
            }
            
            document.getElementById('collectionAmount').textContent = 
                this.formatToBengaliDigits(this.currentAmount);
            this.updateProgressBar();
        }, 30000);
    }

    updateProgressBar() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressFill && progressText) {
            const progress = (this.currentAmount / this.targetAmount) * 100;
            progressFill.style.width = `${Math.min(progress, 100)}%`;
            progressText.textContent = `${Math.min(progress, 100).toFixed(1)}% লক্ষ্য অর্জিত`;
        }
    }

    initializePartnersSlider() {
        const track = document.querySelector('.partners-track');
        if (!track) return;
        
        // Duplicate logos for seamless loop
        const logos = track.querySelectorAll('.partner-logo');
        logos.forEach(logo => {
            const clone = logo.cloneNode(true);
            track.appendChild(clone);
        });
        
        // Smooth animation reset
        track.addEventListener('animationiteration', () => {
            track.style.animation = 'none';
            void track.offsetWidth;
            track.style.animation = null;
        });
    }

    formatToBengaliDigits(number) {
        const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        return number.toString().replace(/\d/g, digit => bengaliDigits[digit]);
    }
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            const isVisible = navLinks.classList.contains('show');
            if (isVisible) {
                navLinks.classList.remove('show');
                this.innerHTML = '<i class="fas fa-bars"></i>';
            } else {
                navLinks.classList.add('show');
                this.innerHTML = '<i class="fas fa-times"></i>';
            }
        });
    }
}

// FAQ Accordion
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Open current if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Smooth Scrolling
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
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    const navLinks = document.querySelector('.nav-links');
                    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                    if (navLinks && mobileMenuBtn) {
                        navLinks.classList.remove('show');
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            }
        });
    });
}

// Scroll to Donate
function scrollToDonate() {
    const donateSection = document.getElementById('donate');
    if (donateSection) {
        donateSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Initialize fund collection
    window.fundCollection = new FundCollection();
    
    // Initialize other components
    initializeMobileMenu();
    initializeFAQ();
    initializeSmoothScrolling();
    
    // Add click events to donate buttons
    const donateButtons = document.querySelectorAll('.urgent-alert-btn, .floating-btn, .cta-button');
    donateButtons.forEach(button => {
        button.addEventListener('click', scrollToDonate);
    });
});

// Add CSS for animations and mobile menu
const style = document.createElement('style');
style.textContent = `
    .nav-links {
        transition: all 0.3s ease;
    }
    
    .partners-track {
        animation: slide 40s linear infinite;
    }
    
    @keyframes slide {
        0% { transform: translateX(0); }
        100% { transform: translateX(calc(-180px * 5 - 2rem * 5)); }
    }
    
    @media (max-width: 768px) {
        .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            border-top: 1px solid #e5e7eb;
        }
        
        .nav-links.show {
            display: flex;
        }
        
        .partners-track {
            animation: slide-mobile 35s linear infinite;
        }
        
        @keyframes slide-mobile {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-140px * 5 - 1rem * 5)); }
        }
    }
`;
document.head.appendChild(style);

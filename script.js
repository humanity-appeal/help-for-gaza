// Loading Screen - Simple and Reliable
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
});

// Simple Fund Collection System
class SimpleFundCollection {
    constructor() {
        this.targetAmount = 500000;
        this.baseAmount = 187650;
        this.init();
    }

    init() {
        this.updateDisplay();
        this.animateNumbers();
        this.updateDaysCount();
        this.startRealTimeUpdates();
    }

    updateDaysCount() {
        const now = new Date();
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const diffTime = endOfMonth - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        const daysElement = document.querySelector('.stat-number[data-count="25"]');
        if (daysElement) {
            daysElement.textContent = this.formatToBengaliDigits(diffDays);
        }
    }

    updateDisplay() {
        const collectionElement = document.getElementById('collectionAmount');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (collectionElement) {
            collectionElement.textContent = this.formatToBengaliDigits(this.baseAmount);
        }
        
        if (progressFill && progressText) {
            const progress = (this.baseAmount / this.targetAmount) * 100;
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${progress.toFixed(1)}% লক্ষ্য অর্জিত`;
        }
    }

    formatToBengaliDigits(number) {
        const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        return number.toString().replace(/\d/g, digit => bengaliDigits[digit]);
    }

    animateNumbers() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            if (counter.id !== 'collectionAmount') {
                const target = parseInt(counter.textContent) || parseInt(counter.getAttribute('data-count'));
                this.animateCounter(counter, target, 1500);
            }
        });
    }

    animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = this.formatToBengaliDigits(target);
                clearInterval(timer);
            } else {
                element.textContent = this.formatToBengaliDigits(Math.floor(start));
            }
        }, 16);
    }

    startRealTimeUpdates() {
        setInterval(() => {
            const randomIncrement = Math.floor(Math.random() * 100) + 50;
            this.baseAmount += randomIncrement;
            
            if (this.baseAmount > this.targetAmount) {
                this.baseAmount = this.targetAmount;
            }
            
            this.updateDisplay();
        }, 30000);
    }
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            const isVisible = navLinks.style.display === 'flex';
            navLinks.style.display = isVisible ? 'none' : 'flex';
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
            
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Scroll to Donate Section
function scrollToDonate() {
    const donateSection = document.getElementById('donate');
    if (donateSection) {
        donateSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize fund collection
    window.fundCollection = new SimpleFundCollection();
    
    // Initialize other components
    initializeMobileMenu();
    initializeFAQ();
    
    // Add click events to donate buttons
    const donateButtons = document.querySelectorAll('.urgent-alert-btn, .floating-btn, .cta-button');
    donateButtons.forEach(button => {
        button.addEventListener('click', scrollToDonate);
    });
    
    // Smooth scrolling for navigation links
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
});

// Add basic CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
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
        }
        
        .nav-links.show {
            display: flex;
        }
    }
`;
document.head.appendChild(style);

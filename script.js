// Persistent Fund Collection System
class PersistentFundCollection {
    constructor() {
        this.targetAmount = 500000;
        this.baseAmount = 12750; // Starting amount
        this.storageKey = 'gazaFundData';
        this.init();
    }

    init() {
        this.loadPersistentData();
        this.updateDisplay();
        this.startRealTimeUpdates();
        this.animateNumbers();
        this.updateDaysCount();
    }

    loadPersistentData() {
        const savedData = localStorage.getItem(this.storageKey);
        
        if (savedData) {
            const data = JSON.parse(savedData);
            
            // Check if data is from today
            const today = new Date().toDateString();
            if (data.date === today) {
                this.baseAmount = data.amount;
            } else {
                // New day - increase amount and save
                this.increaseAmountForNewDay();
            }
        } else {
            // First time - initialize with base amount
            this.savePersistentData();
        }
    }

    increaseAmountForNewDay() {
        // Increase by 2-8% daily to simulate real donations
        const increasePercent = 0.02 + (Math.random() * 0.06);
        const increaseAmount = Math.floor(this.baseAmount * increasePercent);
        this.baseAmount += increaseAmount;
        
        // Ensure we don't exceed target
        if (this.baseAmount > this.targetAmount) {
            this.baseAmount = this.targetAmount;
        }
        
        this.savePersistentData();
    }

    savePersistentData() {
        const data = {
            amount: this.baseAmount,
            date: new Date().toDateString(),
            lastUpdated: Date.now()
        };
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    getDaysUntilMonthEnd() {
        const now = new Date();
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const diffTime = endOfMonth - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(0, diffDays);
    }

    updateDaysCount() {
        const daysElement = document.querySelector('[data-count="25"]');
        if (daysElement) {
            const daysLeft = this.getDaysUntilMonthEnd();
            daysElement.setAttribute('data-count', daysLeft);
        }
    }

    startRealTimeUpdates() {
        // Small random increments to simulate real-time donations
        setInterval(() => {
            const randomIncrement = Math.floor(Math.random() * 50) + 10;
            this.baseAmount += randomIncrement;
            
            if (this.baseAmount > this.targetAmount) {
                this.baseAmount = this.targetAmount;
            }
            
            this.savePersistentData();
            this.updateDisplay();
        }, 45000); // Every 45 seconds
    }

    updateDisplay() {
        const collectionElement = document.getElementById('collectionAmount');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (collectionElement) {
            collectionElement.textContent = this.formatToBengaliDigits(this.baseAmount);
            collectionElement.setAttribute('data-count', this.baseAmount);
        }
        
        if (progressFill && progressText) {
            const progress = (this.baseAmount / this.targetAmount) * 100;
            progressFill.style.width = `${Math.min(progress, 100)}%`;
            progressText.textContent = `${Math.min(progress, 100).toFixed(1)}% লক্ষ্য অর্জিত`;
        }
    }

    formatToBengaliDigits(number) {
        const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        return number.toString().replace(/\d/g, digit => bengaliDigits[digit]);
    }

    animateNumbers() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        counters.forEach(counter => {
            if (counter.id !== 'collectionAmount') {
                const target = parseInt(counter.getAttribute('data-count'));
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
}

// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1200);
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = 'none';
    }
});

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

// Partners Slider
function initializePartnersSlider() {
    const track = document.querySelector('.partners-track');
    if (!track) return;
    
    const logos = document.querySelectorAll('.partner-logo');
    
    // Duplicate logos for seamless loop
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        track.appendChild(clone);
    });
    
    // Reset animation when it completes
    track.addEventListener('animationiteration', () => {
        track.style.animation = 'none';
        void track.offsetWidth;
        track.style.animation = null;
    });
}

// Scroll to Donate Section
function scrollToDonate() {
    document.getElementById('donate').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinksArray = document.querySelectorAll('.nav-link');
    navLinksArray.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('show');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
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
    // Initialize persistent fund collection FIRST
    window.fundCollection = new PersistentFundCollection();
    
    // Initialize other components
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeFAQ();
    initializePartnersSlider();
    
    // Add click events to all donate buttons
    const donateButtons = document.querySelectorAll('.urgent-alert-btn, .floating-btn, .cta-button');
    donateButtons.forEach(button => {
        button.addEventListener('click', scrollToDonate);
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (window.innerWidth <= 768 && navLinks && navLinks.classList.contains('show')) {
        if (!event.target.closest('.nav-links') && !event.target.closest('.mobile-menu-btn')) {
            navLinks.classList.remove('show');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// Resize handler
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const icon = mobileMenuBtn?.querySelector('i');
        
        if (navLinks) navLinks.classList.remove('show');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
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

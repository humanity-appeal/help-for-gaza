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

// Fund collection auto-increment
class FundCollection {
    constructor() {
        this.targetAmount = 500000;
        this.baseCollection = 12750;
        this.lastUpdate = localStorage.getItem('lastCollectionUpdate');
        this.init();
    }

    init() {
        this.updateCollectionBasedOnTime();
        this.startRealTimeUpdates();
        this.animateNumbers();
    }

    updateCollectionBasedOnTime() {
        const now = Date.now();
        const twoHours = 2 * 60 * 60 * 1000;
        
        if (!this.lastUpdate || (now - parseInt(this.lastUpdate)) > twoHours) {
            // Increase collection by 2-5% every 2 hours
            const increasePercent = 0.02 + Math.random() * 0.03;
            this.baseCollection = Math.floor(this.baseCollection * (1 + increasePercent));
            this.lastUpdate = now.toString();
            localStorage.setItem('lastCollectionUpdate', this.lastUpdate);
        }
        
        this.updateDisplay();
    }

    startRealTimeUpdates() {
        // Small random increments every 30 seconds to simulate real donations
        setInterval(() => {
            const randomIncrement = Math.floor(Math.random() * 100) + 50;
            this.baseCollection += randomIncrement;
            
            if (this.baseCollection > this.targetAmount) {
                this.baseCollection = this.targetAmount;
            }
            
            this.updateDisplay();
        }, 30000);
    }

    updateDisplay() {
        const collectionElement = document.getElementById('collectionAmount');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (collectionElement) {
            collectionElement.textContent = this.formatToBengaliDigits(this.baseCollection);
        }
        
        if (progressFill && progressText) {
            const progress = (this.baseCollection / this.targetAmount) * 100;
            progressFill.style.width = `${Math.min(progress, 100)}%`;
            progressText.textContent = `${progress.toFixed(2)}% লক্ষ্য অর্জিত`;
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
                const target = +counter.getAttribute('data-count');
                this.animateCounter(counter, target, 2000);
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

// Intersection Observer for Animations
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

// Observe elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize fund collection
    new FundCollection();
    
    // Observe elements for animation
    const observeElements = document.querySelectorAll('.crisis-card, .trust-item, .impact-card, .hero-stats');
    observeElements.forEach(el => {
        observer.observe(el);
    });
    
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
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
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Theme detection and application
    function detectTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }
    
    // Listen for theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectTheme);
    
    // Initial theme detection
    detectTheme();
});

// Scroll to donate section
function scrollToDonate() {
    document.getElementById('donate').scrollIntoView({
        behavior: 'smooth'
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .crisis-card,
    .trust-item,
    .impact-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .crisis-card.animate-in,
    .trust-item.animate-in,
    .impact-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero-stats .stat-number {
        font-variant-numeric: tabular-nums;
    }
    
    @media (max-width: 768px) {
        .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: var(--bg);
            flex-direction: column;
            padding: 1rem;
            box-shadow: var(--shadow);
            display: none;
        }
        
        .nav-links.show {
            display: flex;
        }

        .simple-payment-buttons {
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        .simple-btn {
            padding: 1.5rem;
            min-height: 100px;
        }

        .btn-icon {
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
            margin-right: 1rem;
        }

        .btn-title {
            font-size: 1.2rem;
        }

        .btn-number {
            font-size: 1.1rem;
        }
    }
`;
document.head.appendChild(style);

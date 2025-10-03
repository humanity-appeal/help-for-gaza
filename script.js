// Optimized JavaScript with auto-incrementing collection amount
class Fundraiser {
    constructor() {
        this.targetAmount = 500000;
        this.baseCollection = 12750;
        this.lastUpdate = localStorage.getItem('lastCollectionUpdate');
        this.initialize();
    }

    initialize() {
        this.setupLoading();
        this.setupNavigation();
        this.setupAnimations();
        this.startAutoIncrement();
        this.updateProgress();
    }

    setupLoading() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadingScreen = document.getElementById('loadingScreen');
                if (loadingScreen) {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => loadingScreen.style.display = 'none', 500);
                }
            }, 1000);
        });
    }

    setupNavigation() {
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        // Mobile menu
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenuBtn?.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }

    setupAnimations() {
        // Simple number animation
        this.animateNumbers();
        
        // Intersection Observer for basic animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.crisis-card, .trust-item, .impact-card').forEach(el => {
            observer.observe(el);
        });
    }

    animateNumbers() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        counters.forEach(counter => {
            if (counter.id !== 'collectionAmount') { // Don't animate collection amount here
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
                element.textContent = this.formatNumber(target);
                clearInterval(timer);
            } else {
                element.textContent = this.formatNumber(Math.floor(start));
            }
        }, 16);
    }

    formatNumber(num) {
        // Convert to Bengali digits
        const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        return num.toString().replace(/\d/g, digit => bengaliDigits[digit]);
    }

    startAutoIncrement() {
        const now = Date.now();
        const twoHours = 2 * 60 * 60 * 1000;
        
        if (!this.lastUpdate || (now - parseInt(this.lastUpdate)) > twoHours) {
            this.lastUpdate = now.toString();
            localStorage.setItem('lastCollectionUpdate', this.lastUpdate);
            
            // Increase collection by 2-5% every 2 hours
            const increasePercent = 0.02 + Math.random() * 0.03; // 2-5%
            this.baseCollection = Math.floor(this.baseCollection * (1 + increasePercent));
        }

        this.updateCollectionAmount();
    }

    updateCollectionAmount() {
        const collectionElement = document.getElementById('collectionAmount');
        if (!collectionElement) return;

        // Add small random increments every minute to simulate real-time donations
        setInterval(() => {
            const randomIncrement = Math.floor(Math.random() * 50) + 10; // 10-60 Taka
            this.baseCollection += randomIncrement;
            
            // Ensure we don't exceed target
            if (this.baseCollection > this.targetAmount) {
                this.baseCollection = this.targetAmount;
            }
            
            collectionElement.textContent = this.formatNumber(this.baseCollection);
            this.updateProgress();
        }, 60000); // Update every minute

        // Initial display
        collectionElement.textContent = this.formatNumber(this.baseCollection);
    }

    updateProgress() {
        const progress = (this.baseCollection / this.targetAmount) * 100;
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressFill) {
            progressFill.style.width = `${Math.min(progress, 100)}%`;
        }
        
        if (progressText) {
            progressText.textContent = `${progress.toFixed(2)}% লক্ষ্য অর্জিত`;
        }
    }
}

// Utility functions
function scrollToDonate() {
    document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Fundraiser();
});

// Add critical CSS for animations
const criticalStyles = `
    .crisis-card,
    .trust-item,
    .impact-card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.4s ease;
    }
    
    .crisis-card.animate-in,
    .trust-item.animate-in,
    .impact-card.animate-in {
        opacity: 1;
        transform: translateY(0);
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
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = criticalStyles;
document.head.appendChild(styleSheet);

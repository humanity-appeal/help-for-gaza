// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
});

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            const isVisible = navLinks.style.display === 'flex';
            navLinks.style.display = isVisible ? 'none' : 'flex';
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (!isVisible) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'white';
                navLinks.style.flexDirection = 'column';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                navLinks.style.gap = '0';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                navLinks.style.display = 'none';
            }
        });
    }
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 1500;
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
    }, 15);
}

// Scroll to Donate Section
function scrollToDonate() {
    document.getElementById('donate').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Real-time collection amount update (simulated)
function simulateRealTimeDonations() {
    const collectionAmount = document.getElementById('collectionAmount');
    let currentAmount = parseInt(collectionAmount.getAttribute('data-count'));
    
    setInterval(() => {
        const randomDonation = Math.floor(Math.random() * 20) + 5;
        currentAmount += randomDonation;
        
        if (currentAmount > 500000) {
            currentAmount = 500000;
        }
        
        collectionAmount.setAttribute('data-count', currentAmount);
        collectionAmount.textContent = formatNumber(currentAmount);
        
        const targetAmount = 500000;
        const percentage = (currentAmount / targetAmount) * 100;
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `${Math.round(percentage)}% লক্ষ্য অর্জিত`;
    }, 20000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    
    // Initialize counters and progress bar
    setTimeout(() => {
        animateCounters();
        animateProgressBar();
    }, 800);
    
    // Start real-time donation simulation
    setTimeout(simulateRealTimeDonations, 3000);
    
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
    
    if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
        if (!event.target.closest('.nav-links') && !event.target.closest('.mobile-menu-btn')) {
            navLinks.style.display = 'none';
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

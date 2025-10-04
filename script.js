// Persistent Fund Collection System with Higher Base Amount
class PersistentFundCollection {
    constructor() {
        this.targetAmount = 500000;
        this.baseAmount = 187650; // Much higher starting amount - ৳1,87,650
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
            // First time - initialize with higher base amount
            this.savePersistentData();
        }
    }

    increaseAmountForNewDay() {
        // Increase by 1-4% daily (smaller percentage since base is larger)
        const increasePercent = 0.01 + (Math.random() * 0.03);
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
            daysElement.textContent = this.formatToBengaliDigits(daysLeft);
        }
    }

    startRealTimeUpdates() {
        // Larger random increments to simulate real-time donations
        setInterval(() => {
            const randomIncrement = Math.floor(Math.random() * 200) + 50; // ৳50-250 increments
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
            } else {
                // For collection amount, animate from a reasonable starting point
                const startAmount = Math.floor(this.baseAmount * 0.7); // Start from 70% of current amount
                this.animateCounter(counter, this.baseAmount, 2000, startAmount);
            }
        });
    }

    animateCounter(element, target, duration, startFrom = 0) {
        let start = startFrom;
        const increment = (target - start) / (duration / 16);
        
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

    // Method to manually reset data if needed (for testing)
    resetData() {
        localStorage.removeItem(this.storageKey);
        this.baseAmount = 187650;
        this.savePersistentData();
        this.updateDisplay();
    }
}

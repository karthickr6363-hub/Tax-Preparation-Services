/**
 * Tax Preparation Services - Main Logic
 * Handles: Theme Toggle, RTL Toggle, LocalStorage Persistence
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();
    initAnimations();
    initMobileMenu();
});

/* --- Theme Management --- */
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        // Update button icon/state based on current theme if needed
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Dispatch event for other components if needed
            window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
        });
    }
}

/* --- RTL Support --- */
function initRTL() {
    // Check if RTL was previously enabled (optional, usually language based)
    const savedDir = localStorage.getItem('dir') || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);

    // Example: A language selector might trigger this
    const rtlToggleBtn = document.getElementById('rtl-toggle');
    if (rtlToggleBtn) {
        rtlToggleBtn.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir');
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';

            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
        });
    }
}

/* --- Scroll Animations (AOS) --- */
function initAnimations() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }
}

/* --- Mobile Menu --- */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    if (mobileToggle && mobileNav && mobileOverlay) {
        const toggleMenu = () => {
            mobileNav.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            mobileToggle.innerHTML = mobileNav.classList.contains('active') ? '✕' : '☰';
        };

        mobileToggle.addEventListener('click', toggleMenu);
        mobileOverlay.addEventListener('click', toggleMenu);

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                mobileOverlay.classList.remove('active');
                mobileToggle.innerHTML = '☰';
            });
        });
    }
}

// Utility function to safely execute code if element exists
function executeIfElementExists(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
        callback(element);
    } else {
        console.log(`Element ${selector} not found, skipping execution`);
    }
}

// Mobile Menu Toggle
executeIfElementExists('.mobile-menu-btn', (mobileMenuBtn) => {
    executeIfElementExists('.nav-links', (navLinks) => {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ?
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });
    });
});

// Navbar scroll effect
executeIfElementExists('#navbar', (navbar) => {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        executeIfElementExists('.nav-links', (navLinks) => {
            executeIfElementExists('.mobile-menu-btn', (mobileMenuBtn) => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            });
        });

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        executeIfElementExists(targetId, (targetElement) => {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            history.pushState(null, null, targetId);
        });
    });
});

// Testimonial slider
executeIfElementExists('.testimonial-slider', (slider) => {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dot');

    if (slides.length > 0 && dots.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetInterval();
            });
        });

        function startInterval() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        // Start the slider
        showSlide(0);
        startInterval();

        // Pause slider on hover for better UX
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', startInterval);
    }
});

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .portfolio-item');
    if (elements.length > 0) {
        const windowHeight = window.innerHeight;

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }
}

// Initial check
animateOnScroll();

// Check on scroll
window.addEventListener('scroll', animateOnScroll);

// Night Mode Toggle
executeIfElementExists('#themeToggle', (themeToggle) => {
    const body = document.body;

    // Check for saved user preference
    const savedTheme = localStorage.getItem('nightMode');
    if (savedTheme === 'true') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.setAttribute('aria-label', 'Toggle light mode');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    }

    // Toggle night mode
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // Save the current preference
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('nightMode', isDarkMode);

        // Update the icon and aria-label
        if (isDarkMode) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.setAttribute('aria-label', 'Toggle light mode');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        }
    });
});

// Lazy load images
document.addEventListener('DOMContentLoaded', function () {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const companyPackages = document.querySelector('.company-packages');
    const studentPackages = document.querySelector('.student-packages');

    // Cek apakah elemen penting tersedia sebelum melanjutkan
    if (!categoryBtns.length || !companyPackages || !studentPackages) return;

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get the category to show
            const category = this.dataset.category;

            // Show/hide the appropriate packages
            if (category === 'company') {
                companyPackages.style.display = 'grid';
                studentPackages.style.display = 'none';
            } else {
                companyPackages.style.display = 'none';
                studentPackages.style.display = 'grid';
            }
        });
    });

    const lazyImages = [].slice.call(document.querySelectorAll('img[loading="lazy"]'));

    if (lazyImages.length > 0 && 'IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src || lazyImage.src;
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function (lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});

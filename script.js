// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
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

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#ffffff';
        header.style.backdropFilter = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.course-card, .feature, .class-card');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Course card hover effects
document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Course "SAIBA MAIS" buttons functionality
document.querySelectorAll('.course-card .btn-primary, .course-card .btn-luxury').forEach(button => {
    button.addEventListener('click', function(e) {
        // If button has target="_blank", let it redirect normally
        if (this.getAttribute('target') === '_blank') {
            return; // Don't prevent default, let the link work normally
        }
        
        e.preventDefault();

        const courseTitle = this.closest('.course-card').querySelector('h3').textContent;
        const coursePrice = this.closest('.course-card').querySelector('.price').textContent;

        // Show course details modal or redirect
        showCourseModal(courseTitle, coursePrice);
    });
});

// Course modal functionality
function showCourseModal(title, price) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('courseModal');
    if (!modal) {
        modal = createCourseModal();
    }

    // Update modal content
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-price').textContent = price;

    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function createCourseModal() {
    const modalHTML = `
        <div id="courseModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2 class="modal-title"></h2>
                <p class="modal-price"></p>
                <p>Para mais informações sobre este curso, entre em contato conosco!</p>
                <div class="modal-buttons">
                    <button class="btn btn-primary" onclick="contactWhatsApp()">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </button>
                    <button class="btn btn-secondary" onclick="contactEmail()">
                        <i class="fas fa-envelope"></i> Email
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('courseModal');

    // Close modal events
    modal.querySelector('.close').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    return modal;
}

function closeModal() {
    const modal = document.getElementById('courseModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Contact functions
function contactWhatsApp() {
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os cursos da Elite das Massagens.');
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
}

function contactEmail() {
    window.location.href = 'mailto:contato@elitedasmassagens.com?subject=Informações sobre cursos';
}

// Add modal styles dynamically
const modalStyles = `
    .modal {
        display: none;
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        background-color: white;
        padding: 2rem;
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        position: relative;
        animation: modalFadeIn 0.3s ease;
    }

    @keyframes modalFadeIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
    }

    .close {
        position: absolute;
        right: 1rem;
        top: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
    }

    .close:hover {
        color: #000;
    }

    .modal-title {
        color: #2563eb;
        margin-bottom: 1rem;
    }

    .modal-price {
        font-size: 1.5rem;
        font-weight: bold;
        color: #2563eb;
        margin-bottom: 1rem;
    }

    .modal-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
    }

    .modal-buttons .btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    @media (max-width: 480px) {
        .modal-buttons {
            flex-direction: column;
        }

        .modal-buttons .btn {
            width: 100%;
        }
    }
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

// ESC key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Form validation for future contact forms
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData) {
    // Integration with Google Analytics, Facebook Pixel, etc.
    console.log(`Event: ${eventName}`, eventData);
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-primary') ||
        e.target.classList.contains('btn-luxury')) {
        trackEvent('button_click', {
            button_text: e.target.textContent,
            button_type: e.target.className,
            page_section: e.target.closest('section')?.id || 'unknown'
        });
    }
});

// Performance optimization: Lazy load images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[src*="unsplash"], img[src*="placeholder"]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);

        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add to CSS
const loadingStyles = `
    body {
        transition: opacity 0.3s ease;
    }

    body:not(.loaded) {
        opacity: 0;
    }

    body.loaded {
        opacity: 1;
    }
`;

const loadingStyleSheet = document.createElement('style');
loadingStyleSheet.textContent = loadingStyles;
document.head.appendChild(loadingStyleSheet);

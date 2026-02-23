// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Create particle effect
function createParticles(e) {
    const x = e.clientX;
    const y = e.clientY;
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.background = 'linear-gradient(135deg, #ff8c00, #ffa500)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.animation = `float${i} 1s ease-out forwards`;
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// Add particle animations to CSS
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes float0 {
        to {
            transform: translate(-50px, -100px);
            opacity: 0;
        }
    }
    @keyframes float1 {
        to {
            transform: translate(50px, -100px);
            opacity: 0;
        }
    }
    @keyframes float2 {
        to {
            transform: translate(-30px, -80px);
            opacity: 0;
        }
    }
    @keyframes float3 {
        to {
            transform: translate(30px, -80px);
            opacity: 0;
        }
    }
    @keyframes float4 {
        to {
            transform: translate(0px, -120px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

// Booking Modal
const bookingBtn = document.querySelector('.btn-primary');
const bookingModal = document.getElementById('bookingModal');
const closeBtn = document.querySelector('.close');
const bookingForm = document.getElementById('bookingForm');

// Open modal when "Book Your Ride Today" button is clicked
if (bookingBtn && bookingBtn.closest('.hero')) {
    bookingBtn.addEventListener('click', (e) => {
        createParticles(e);
        bookingModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
}

// Close modal when close button is clicked
closeBtn.addEventListener('click', () => {
    bookingModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
        bookingModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Handle booking form submission
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(bookingForm);
    const data = {
        name: formData.get('name') || document.querySelector('.modal-content input[placeholder="Your Name"]').value,
        email: formData.get('email') || document.querySelector('.modal-content input[placeholder="Your Email"]').value,
        phone: formData.get('phone') || document.querySelector('.modal-content input[placeholder="Phone Number"]').value,
        date: document.querySelector('.modal-content input[type="date"]').value,
        pickupLocation: document.querySelector('.modal-content input[placeholder="Pickup Location"]').value,
        dropLocation: document.querySelector('.modal-content input[placeholder="Drop Location"]').value,
        serviceType: document.querySelector('.modal-content select').value,
        specialRequests: document.querySelector('.modal-content textarea').value || ''
    };

    // Show success message
    alert(`Thank you for booking! We'll contact you shortly at ${data.phone} to confirm your booking.`);
    
    // Reset form
    bookingForm.reset();
    
    // Close modal
    bookingModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Handle contact form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.children[0].value;
        const email = contactForm.children[1].value;
        const phone = contactForm.children[2].value;
        const message = contactForm.children[3].value;

        // You can send this data to a backend service
        console.log({
            name,
            email,
            phone,
            message
        });

        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Smooth scroll for navigation links
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

// Advanced scroll animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `slideInLeft 0.6s ease-out ${index * 0.1}s forwards`;
            entry.target.style.opacity = '0';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all interactive elements
document.querySelectorAll('.service-card, .testimonial-card, .about-text, .feature-item, .destination').forEach(el => {
    observer.observe(el);
});

// Counter animation for cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.service-card, .testimonial-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Mouse move parallax effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
    
    const parallaxElements = document.querySelectorAll('.image-placeholder, .image-placeholder-large');
    parallaxElements.forEach(el => {
        const offsetX = (mouseX - 0.5) * 20;
        const offsetY = (mouseY - 0.5) * 20;
        el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
});

// Add animation keyframes dynamically
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .service-card, .testimonial-card, .about-text, .feature-item, .destination {
        opacity: 0;
    }
`;
document.head.appendChild(dynamicStyles);

// Sticky navigation highlight on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active class styling to CSS dynamically
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-menu a.active {
        color: #ff8c00;
        border-bottom: 2px solid #ff8c00;
        padding-bottom: 5px;
    }
`;
document.head.appendChild(navStyle);

// WhatsApp and Email quick links
document.addEventListener('DOMContentLoaded', () => {
    const phoneLink = document.querySelector('a[href="tel:9688779900"]');
    const emailLink = document.querySelector('a[href="mailto:s309.travels@gmail.com"]');

    if (phoneLink) {
        phoneLink.addEventListener('click', function(e) {
            // You can add custom handling here if needed
        });
    }

    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            // You can add custom handling here if needed
        });
    }
});

// Prevent form submission in the booking modal - just demonstrate
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.modal-content input, .modal-content select, .modal-content textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});

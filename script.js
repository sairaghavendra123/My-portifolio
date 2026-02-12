document.addEventListener("DOMContentLoaded", function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            hamburger.classList.toggle("active");
        });
    }

    // Scroll Spy for Navigation
    const navItems = document.querySelectorAll('.nav-links a');
    const spySections = document.querySelectorAll('section');

    const spyOptions = {
        threshold: 0.5 // Trigger when 50% of section is visible
    };

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                // Remove active from all links
                navItems.forEach(link => link.classList.remove('active'));
                // Add active to current link
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (activeLink) {
                   activeLink.classList.add('active');
                }
            }
        });
    }, spyOptions);

    spySections.forEach(section => {
        spyObserver.observe(section);
    });

    // Smooth scrolling for navigation (Enhanced)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Close mobile menu if open
            if (navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                hamburger.classList.remove("active");
            }

            if (targetSection) {
                 window.scrollTo({
                    top: targetSection.offsetTop - 70, // Offset for header height
                    behavior: 'smooth'
                 });
            }
        });
    });

    // 3D Tilt Effect
    const tiltCards = document.querySelectorAll('.tilt-card, .project-card, .cert-card, .skill-category');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Reveal sections on scroll with 3D transition
   const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll(".section");
    sections.forEach(section => {
        section.classList.add('hidden'); // Add initial hidden state
        observer.observe(section);
    });
});
if (!("scrollBehavior" in document.documentElement.style)) {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/smoothscroll-polyfill/0.4.4/smoothscroll.min.js";
    document.head.appendChild(script);
}

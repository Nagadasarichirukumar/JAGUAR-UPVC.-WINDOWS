// ----- Intersection Observer for scroll reveal animation (fade-up)
const revealElements = document.querySelectorAll('.scroll-reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // once revealed, stop observing
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -20px 0px" });

revealElements.forEach(el => {
    observer.observe(el);
});

// Additional small animation: dynamic background subtle circle movement (mouse parallax effect for extra polish)
document.addEventListener('mousemove', (e) => {
    const bgAnim = document.querySelector('.bg-animation');
    if (bgAnim) {
        const x = (e.clientX / window.innerWidth) * 20;
        const y = (e.clientY / window.innerHeight) * 20;
        bgAnim.style.transform = `translate(${x * 0.03}%, ${y * 0.03}%)`;
    }
});

// Add floating element effect on product cards on hover (already css), also smooth anchor
// SPA Navigation
const pageAnchors = document.querySelectorAll('a[href^="#"]');
const pages = document.querySelectorAll('.page-section');

pageAnchors.forEach(item => {
    item.addEventListener('click', (e) => {
        const href = item.getAttribute('href');
        if (!href || !href.startsWith('#')) return;

        const targetId = href.substring(1);
        const targetPage = document.getElementById(targetId);

        if (targetPage && targetPage.classList.contains('page-section')) {
            e.preventDefault();

            // Update active nav link if this is a nav item
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(nav => nav.classList.remove('active'));
            if (item.classList.contains('nav-item')) {
                item.classList.add('active');
            }

            // Hide all pages, show target
            pages.forEach(page => {
                page.style.display = 'none';
                page.classList.remove('active');
            });

            targetPage.style.display = 'block';
            setTimeout(() => {
                targetPage.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 50);

            // Close mobile menu if open
            const navLinksContainer = document.querySelector('.nav-links');
            const mobileMenuBtn = document.getElementById('mobile-menu');
            if (navLinksContainer && navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                if (mobileMenuBtn) {
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        }
    });
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        if (icon) {
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// also click on product cards? not needed but great experience: show simple toast style msg (soft)
const cards = document.querySelectorAll('.card');
cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
        const prodName = card.querySelector('h3')?.innerText || 'product';
        // tiny interactive feedback without being intrusive
        const feedback = document.createElement('div');
        feedback.innerText = `🔧 ${prodName} — request a free consultation & quote!`;
        feedback.style.position = 'fixed';
        feedback.style.bottom = '20px';
        feedback.style.left = '50%';
        feedback.style.transform = 'translateX(-50%)';
        feedback.style.backgroundColor = '#fdfdfd';
        feedback.style.color = '#0a1f1c';
        feedback.style.padding = '12px 24px';
        feedback.style.borderRadius = '40px';
        feedback.style.fontWeight = 'bold';
        feedback.style.backdropFilter = 'blur(8px)';
        feedback.style.zIndex = '999';
        feedback.style.fontSize = '0.9rem';
        feedback.style.boxShadow = '0 8px 20px rgba(243, 242, 242, 0.94)';
        document.body.appendChild(feedback);
        setTimeout(() => { feedback.style.opacity = '0'; setTimeout(() => feedback.remove(), 600); }, 2000);
    });
});

// Number counter animation
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            let current = 0;
            const increment = target / 60; // adjust speed
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    entry.target.innerText = Math.ceil(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    entry.target.innerText = target.toLocaleString() + (target === 50000 ? '+' : '');
                }
            };
            updateCounter();
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statObserver.observe(stat);
});

// extra: make phone numbers clickable (call suggestion)
const phoneNumbers = document.querySelectorAll('.contact-item:first-child .contact-item div strong');
// but easier: we modify contact links
const phoneLinks = document.querySelectorAll('.contact-item i.fa-phone-alt, .contact-item i.fa-phone-alt + div');
const phoneDiv = document.querySelector('.contact-item div strong')?.parentElement;
if (phoneDiv) {
    const numbers = phoneDiv.innerText.split(',');
    if (numbers.length) {
        phoneDiv.style.cursor = 'pointer';
        phoneDiv.addEventListener('click', () => {
            window.location.href = `tel:${numbers[0].replace(/\D/g, '')}`;
        });
    }
}
const secondPhone = document.querySelector('.contact-item i.fa-phone-alt')?.parentElement;
if (secondPhone) secondPhone.style.cursor = 'pointer';
// extra for address copy? not needed, but nice.
console.log('Jaguar UPVC website loaded with premium animations');

// --- Brochure Auto-scroll ---
const brochureContainer = document.querySelector('.brochure-container-vertical');
let brochureScrollInterval;
let brochureScrollSpeed = 1;

function startBrochureScroll() {
    if(!brochureContainer) return;
    brochureScrollInterval = setInterval(() => {
        brochureContainer.scrollTop += brochureScrollSpeed;
        // Check if reached bottom
        if (brochureContainer.scrollTop + brochureContainer.clientHeight >= brochureContainer.scrollHeight - 1) {
            brochureContainer.scrollTop = 0;
        }
    }, 30);
}

function stopBrochureScroll() {
    clearInterval(brochureScrollInterval);
}

if(brochureContainer) {
    // wait a moment before starting to allow rendering
    setTimeout(startBrochureScroll, 1000);
    brochureContainer.addEventListener('mouseenter', stopBrochureScroll);
    brochureContainer.addEventListener('mouseleave', startBrochureScroll);
    brochureContainer.addEventListener('touchstart', stopBrochureScroll);
    brochureContainer.addEventListener('touchend', startBrochureScroll);
}

// --- Fullscreen Image Modal ---
const modalOverlay = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const closeModal = document.querySelector('.close-image-modal');
const zoomableImages = document.querySelectorAll('.zoomable img');

if(modalOverlay && modalImg && closeModal) {
    zoomableImages.forEach(img => {
        img.addEventListener('click', () => {
            modalImg.src = img.src;
            modalOverlay.style.display = 'flex';
            // small delay for transition
            setTimeout(() => {
                modalOverlay.classList.add('show');
            }, 10);
        });
    });

    closeModal.addEventListener('click', () => {
        modalOverlay.classList.remove('show');
        setTimeout(() => {
            modalOverlay.style.display = 'none';
        }, 300);
    });

    // click outside to close
    modalOverlay.addEventListener('click', (e) => {
        if(e.target === modalOverlay) {
            modalOverlay.classList.remove('show');
            setTimeout(() => {
                modalOverlay.style.display = 'none';
            }, 300);
        }
    });
}

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
const allBtns = document.querySelectorAll('.btn-primary, .btn-outline, .nav-links a');
allBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.getAttribute('href') === '#') {
            e.preventDefault();
            // just demo: scroll to contact section if needed but we just show alert for demo?
            if(btn.innerText.includes('Quote')) {
                document.querySelector('.contact-section').scrollIntoView({ behavior: 'smooth' });
            } else if(btn.innerText.includes('Gallery')) {
                alert('✨ Premium Gallery: We will showcase stunning Jaguar UPVC installations soon.\n📞 Contact for live demonstration.');
            } else {
                // for nav home we scroll top
                if(btn.innerText.trim() === 'Home') window.scrollTo({top:0, behavior:'smooth'});
                else if(btn.innerText === 'Contact') document.querySelector('.contact-section').scrollIntoView({behavior:'smooth'});
                else if(btn.innerText === 'Products') document.querySelector('.cards-grid').scrollIntoView({behavior:'smooth'});
            }
        }
    });
});

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

// tiny dynamic counter (just for visual fun on stats)
const counters = document.querySelectorAll('h3');
// not all h3 will be numbers but for the stats we can manually set: but simpler - skip heavy counter, but add subtle floating pulse
const statsBlocks = document.querySelectorAll('div[style*="flex:1"] h3');
if(statsBlocks.length) {
    statsBlocks.forEach(block => {
        const originalText = block.innerText;
        if(originalText.includes('5000+') || originalText.includes('#1') || originalText.includes('15+') || originalText.includes('10 Year')) {
            // just decoration, keep as is but add hover pulse
            block.style.transition = '0.2s';
            block.parentElement.addEventListener('mouseenter', () => {
                block.style.transform = 'scale(1.03)';
            });
            block.parentElement.addEventListener('mouseleave', () => {
                block.style.transform = 'scale(1)';
            });
        }
    });
}

// extra: make phone numbers clickable (call suggestion)
const phoneNumbers = document.querySelectorAll('.contact-item:first-child .contact-item div strong');
// but easier: we modify contact links
const phoneLinks = document.querySelectorAll('.contact-item i.fa-phone-alt, .contact-item i.fa-phone-alt + div');
const phoneDiv = document.querySelector('.contact-item div strong')?.parentElement;
if(phoneDiv) {
    const numbers = phoneDiv.innerText.split(',');
    if(numbers.length) {
        phoneDiv.style.cursor = 'pointer';
        phoneDiv.addEventListener('click', () => {
            window.location.href = `tel:${numbers[0].replace(/\D/g,'')}`;
        });
    }
}
const secondPhone = document.querySelector('.contact-item i.fa-phone-alt')?.parentElement;
if(secondPhone) secondPhone.style.cursor = 'pointer';
// extra for address copy? not needed, but nice.
console.log('Jaguar UPVC website loaded with premium animations');
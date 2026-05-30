/* =========================================
   SUNDOWN STUDIO — Script
   ========================================= */

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const cursorBlur = document.getElementById('cursor-blur');
let mouseX = 0, mouseY = 0;
let blurX = 0, blurY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// Smooth lag for blur ring
function animateCursor() {
    blurX += (mouseX - blurX) * 0.12;
    blurY += (mouseY - blurY) * 0.12;
    cursorBlur.style.left = blurX + 'px';
    cursorBlur.style.top = blurY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorBlur.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorBlur.style.opacity = '1';
});


// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});


// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});


// ===== VIDEO REVEAL =====
const videoSection = document.getElementById('videoSection');
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('revealed');
            videoObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.2 });
if (videoSection) videoObserver.observe(videoSection);


// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 80);
            revealObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));


// ===== PROJECT HOVER IMAGE =====
const elemContainer = document.querySelector('#elem-container');
const fixImg = document.querySelector('#fixed-image');

// Only enable on non-touch, non-mobile
const isDesktop = () => window.innerWidth > 960 && !('ontouchstart' in window);

if (elemContainer && fixImg) {
    elemContainer.addEventListener('mouseenter', () => {
        if (isDesktop()) fixImg.style.display = 'block';
    });
    elemContainer.addEventListener('mouseleave', () => {
        fixImg.style.display = 'none';
    });

    document.querySelectorAll('.elem').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (!isDesktop()) return;
            const img = el.getAttribute('data-img');
            fixImg.style.backgroundImage = `url(${img})`;
        });
    });

    // Move fixed image with cursor
    document.addEventListener('mousemove', (e) => {
        if (fixImg.style.display === 'block') {
            fixImg.style.left = e.clientX + 'px';
            fixImg.style.top = (e.clientY - 40) + 'px';
        }
    });
}


// ===== PAGE 2 ELEMENTS REVEAL =====
document.querySelectorAll('#page2-inner, #page3-header, #page4-inner').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});
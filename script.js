(function () {
    // ==================== DOM ELEMENTS ====================
    const loadingScreen = document.getElementById('loadingScreen');
    const navbar = document.getElementById('navbar');
    const heroHeading = document.getElementById('heroHeading');
    const customCursor = document.getElementById('customCursor');
    const customCursorDot = document.getElementById('customCursorDot');
    const videoSection = document.getElementById('videoSection');
    const workSection = document.getElementById('workSection');
    const heroShape = document.getElementById('hero-shape');

    // ==================== LOADING SCREEN ====================
    // Hide loading screen after stairs animation completes
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Start hero text stairs animation after loading screen begins to hide
            setTimeout(() => {
                animateHeroTextStairs();
            }, 400);
        }, 1800);
    });

    // Fallback: if load event already fired
    if (document.readyState === 'complete') {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                animateHeroTextStairs();
            }, 400);
        }, 1800);
    }

    // ==================== HERO TEXT STAIRS ANIMATION ====================
    function animateHeroTextStairs() {
        const heading = heroHeading;
        // Get all text content, preserving structure
        const textNodes = [];
        const walker = document.createTreeWalker(
            heading,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.trim()) {
                textNodes.push(node);
            }
        }

        // Process each text node
        let globalCharIndex = 0;
        const allSpans = [];

        textNodes.forEach((textNode) => {
            const text = textNode.textContent;
            const fragment = document.createDocumentFragment();
            const chars = [];

            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const span = document.createElement('span');
                span.textContent = char;
                span.classList.add('stairs-char');
                span.style.animationDelay = `${globalCharIndex * 0.04}s`;
                span.style.display = 'inline-block';
                if (char === ' ') {
                    span.style.width = '0.25em';
                }
                fragment.appendChild(span);
                chars.push(span);
                globalCharIndex++;
            }

            allSpans.push(...chars);
            textNode.parentNode.replaceChild(fragment, textNode);
        });

        // After all animations complete, clean up spans (optional)
        const totalAnimationTime = (globalCharIndex * 0.04) + 0.7; // delay + animation duration
        setTimeout(() => {
            // Merge spans back or keep them - keeping gives more control
            // We'll keep them for the polished look
        }, totalAnimationTime * 1000 + 500);
    }

    // ==================== CUSTOM CURSOR ====================
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;
    let isHovering = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

  

   
    // Smooth cursor animation loop
    function animateCursor() {
        // Smooth follow with different easing for main cursor and dot
        const easeMain = 0.12;
        const easeDot = 0.25;

        cursorX += (mouseX - cursorX) * easeMain;
        cursorY += (mouseY - cursorY) * easeMain;

        dotX += (mouseX - dotX) * easeDot;
        dotY += (mouseY - dotY) * easeDot;

        customCursor.style.left = cursorX + 'px';
        customCursor.style.top = cursorY + 'px';

        customCursorDot.style.left = dotX + 'px';
        customCursorDot.style.top = dotY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hide default cursor
    document.body.style.cursor = 'none';
    document.querySelectorAll('a, li, .work-card, button, #page1-left img').forEach(el => {
        el.style.cursor = 'none';
    });

    

  







})();
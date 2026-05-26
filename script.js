const videoSection = document.getElementById('videoSection');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // animate only once
        }
    });
}, { threshold: 0.15 });
observer.observe(videoSection);
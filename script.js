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


// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#main'),
//     smooth: true
// });


var elemC = document.querySelector("#elem-container")
var fixImg = document.querySelector("#fixed-image")
elemC.addEventListener('mouseenter', () => {
    fixImg.style.display = 'block'
})
elemC.addEventListener('mouseleave', () => {
    fixImg.style.display = 'none'
})


// var elem1 = document.querySelector("#elem1")
// elem1.addEventListener("mouseenter", () => {
//     var image = elem1.getAttribute("data-img")
//     fixImg.style.backgroundImage = `url(${image})`

// })


var elem = document.querySelectorAll(".elem")
elem.forEach(function (e) {

    e.addEventListener("mouseenter", () =>{
        var image = e.getAttribute("data-img")
        fixImg.style.backgroundImage = `url(${image})`
    })

})


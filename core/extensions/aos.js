//AOS
function aos() {
    var element = document.querySelectorAll('.aos');
    for (var i = 0; i < element.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = element[i].getBoundingClientRect().top;
        var elementVisible = 25;
        if (elementTop < windowHeight - elementVisible) {element[i].classList.add('active');}
        else {element[i].classList.remove('active');}
    }
}
window.addEventListener('scroll', aos);
$('style').append('.aos {will-change: transform; transition: 0.5s;}');
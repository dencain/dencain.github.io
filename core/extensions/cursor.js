$('body').append('<div class="cursor dot"></div><div class="cursor circle"></div>');
$('style').append('.cursor {position: fixed; top: 0%; left: 0%; aspect-ratio: 1/1; border-radius: 50%; pointer-events: none; z-index: 100; transform: translate(-50%, -50%); mix-blend-mode: exclusion; &.dot {width: 1rem; background-color: #fff; transition: width 0.25s;} &.circle {width: 3rem; outline: 0.125rem solid #fff; transition: width 0.25s, outline 0.25s, background-color 0.5s;}} .cursor.dot.active {width: 0.5rem;} .cursor.circle.active {width: 4rem; background: rgba(240, 240, 240, 0.25); outline: 0.125rem solid transparent;}');

let mouseX = 0;
let mouseY = 0;
let circleX = 0;
let circleY = 0;

function animate() {
  const speed = 0.1;
  circleX += (mouseX - circleX) * speed;
  circleY += (mouseY - circleY) * speed;
  $('.cursor.circle').css('left', `${circleX}px`);
  $('.cursor.circle').css('top', `${circleY}px`);
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  $('.cursor.dot').css('left', `${mouseX}px`);
  $('.cursor.dot').css('top', `${mouseY}px`);
});

$('a').on('mouseenter', () => {$('.cursor').addClass('active');});
$('a').on('mouseleave', () => {$('.cursor').removeClass('active');});
document.querySelectorAll('.swiper').forEach(slider => {
  const track = slider.querySelector('.swiper-track');
  const slides = slider.querySelectorAll('.slide');
  const dotsContainer = slider.querySelector('.swiper-dots');
  const currentEl = slider.querySelector('.current');
  const totalEl = slider.querySelector('.total');
  const intervalTime = parseInt(slider.dataset.interval) || 5000;

  let index = 0;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let isDragging = false;
  let timer;
  
  totalEl.textContent = slides.length;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('slider-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.slider-dot');
  
  function update() {track.style.transform = `translateX(${-index * 100}%)`; currentEl.textContent = index + 1; dots.forEach((d, i) => d.classList.toggle('active', i === index));}
  function goToSlide(i) {index = (i + slides.length) % slides.length; prevTranslate = -index * track.clientWidth; update(); resetTimer();}
  function start(e) {startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX; isDragging = true; clearInterval(timer);}
  function move(e) {if (!isDragging) return; const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX; const diff = currentX - startX; track.style.transform = `translateX(${prevTranslate + diff}px)`;}
  function end(e) {if (!isDragging) return; isDragging = false; const movedBy = (e.type.includes('mouse') ? e.pageX : e.changedTouches[0].clientX) - startX; if (movedBy < -50 && index < slides.length - 1) index++; if (movedBy > 50 && index > 0) index--; prevTranslate = -index * track.clientWidth; update(); startTimer();}
  
  track.addEventListener('mousedown', start);
  track.addEventListener('mousemove', move);
  track.addEventListener('mouseup', end);
  track.addEventListener('mouseleave', end);
  
  track.addEventListener('touchstart', start);
  track.addEventListener('touchmove', move);
  track.addEventListener('touchend', end);
  
  function startTimer() {timer = setInterval(() => goToSlide(index + 1), intervalTime);}
  function resetTimer() {clearInterval(timer); startTimer();}
  startTimer();
});
//data-interval="1000"
class TouchSlider {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.wrapper = this.container.querySelector('.slider-wrapper');
    this.slides = Array.from(this.container.querySelectorAll('.slide'));
    
    // Configuration Options
    this.options = {
      autoplay: options.autoplay ?? false,
      autoplaySpeed: options.autoplaySpeed ?? 3000,
    };

    // State Variables
    this.currentIndex = 0;
    this.startX = 0;
    this.currentTranslate = 0;
    this.prevTranslate = 0;
    this.isDragging = false;
    this.autoplayTimer = null;

    this.init();
  }

  init() {
    this.setupPagination();
    this.updateUI();
    this.bindEvents();
    if (this.options.autoplay) this.startAutoplay();
  }

  setupPagination() {
    const paginationContainer = this.container.querySelector('.slider-pagination');
    const totalContainer = this.container.querySelector('.slider-counter .total');
    
    totalContainer.textContent = this.slides.length;
    
    this.slides.forEach((_, index) => {
      const bullet = document.createElement('div');
      bullet.classList.add('pagination-bullet');
      bullet.addEventListener('click', () => this.goToSlide(index));
      paginationContainer.appendChild(bullet);
    });
  }

  bindEvents() {
    // Arrow Navigation
    this.container.querySelector('.prev').addEventListener('click', () => this.prevSlide());
    this.container.querySelector('.next').addEventListener('click', () => this.nextSlide());

    // Touch Events
    this.wrapper.addEventListener('touchstart', (e) => this.dragStart(e));
    this.wrapper.addEventListener('touchmove', (e) => this.dragMove(e));
    this.wrapper.addEventListener('touchend', () => this.dragEnd());

    // Mouse Events (For desktop testing)
    this.wrapper.addEventListener('mousedown', (e) => this.dragStart(e));
    this.wrapper.addEventListener('mousemove', (e) => this.dragMove(e));
    this.wrapper.addEventListener('mouseup', () => this.dragEnd());
    this.wrapper.addEventListener('mouseleave', () => { if (this.isDragging) this.dragEnd(); });

    // Autoplay Pause on Hover
    this.container.addEventListener('mouseenter', () => this.stopAutoplay());
    this.container.addEventListener('mouseleave', () => { if (this.options.autoplay) this.startAutoplay(); });
  }

  // Slide Logic
  goToSlide(index) {
    this.currentIndex = index;
    this.currentTranslate = this.currentIndex * -this.container.offsetWidth;
    this.prevTranslate = this.currentTranslate;
    this.wrapper.style.transform = `translateX(${this.currentTranslate}px)`;
    this.updateUI();
  }

  nextSlide() {
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  }

  // Drag / Swipe Logic
  dragStart(e) {
    this.isDragging = true;
    this.startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    this.wrapper.style.transition = 'none';
    this.stopAutoplay();
  }

  dragMove(e) {
    if (!this.isDragging) return;
    const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const currentMoved = currentX - this.startX;
    this.currentTranslate = this.prevTranslate + currentMoved;
    this.wrapper.style.transform = `translateX(${this.currentTranslate}px)`;
  }

  dragEnd() {
    this.isDragging = false;
    this.wrapper.style.transition = 'transform 0.3s ease-out';
    const movedBy = this.currentTranslate - this.prevTranslate;

    // Swipe threshold: 50 pixels
    if (movedBy < -50 && this.currentIndex < this.slides.length - 1) {
      this.currentIndex += 1;
    } else if (movedBy > 50 && this.currentIndex > 0) {
      this.currentIndex -= 1;
    }

    this.goToSlide(this.currentIndex);
    if (this.options.autoplay) this.startAutoplay();
  }

  // UI Updates
  updateUI() {
    // Update Counter
    this.container.querySelector('.slider-counter .current').textContent = this.currentIndex + 1;

    // Update Pagination Bullets
    const bullets = this.container.querySelectorAll('.pagination-bullet');
    bullets.forEach((bullet, index) => {
      bullet.classList.toggle('active', index === this.currentIndex);
    });
  }

  // Autoplay Logic
  startAutoplay() {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => this.nextSlide(), this.options.autoplaySpeed);
  }

  stopAutoplay() {
    clearInterval(this.autoplayTimer);
  }
}

// Initialize Slider
const slider = new TouchSlider('mySlider', {
  autoplay: true,       // Set false to turn off autoslide
  autoplaySpeed: 4000   // Speed in milliseconds
});
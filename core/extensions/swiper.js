class ModernSlider {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.track = this.container.querySelector('#track');
    this.slides = [...this.container.querySelectorAll('.slide')];
    this.counter = this.container.querySelector('#counter');
    this.pagination = this.container.querySelector('#pagination');
    this.prevBtn = this.container.querySelector('#prevBtn');
    this.nextBtn = this.container.querySelector('#nextBtn');

    // Configuration
    this.options = {
      autoplay: true,
      interval: 4000,
      ...options
    };

    this.currentIndex = 0;
    this.autoplayTimer = null;

    this.init();
  }

  init() {
    this.createPagination();
    this.updateUI();

    // Event Listeners
    this.prevBtn.addEventListener('click', () => this.scrollSlide(-1));
    this.nextBtn.addEventListener('click', () => this.scrollSlide(1));

    // Modern optimized scroll listener utilizing modern debounce/throttle logic via native state checking
    this.track.addEventListener('scroll', () => this.handleScroll(), { passive: true });

    // Pause autoplay on human interaction
    this.container.addEventListener('mouseenter', () => this.stopAutoplay());
    this.container.addEventListener('mouseleave', () => this.startAutoplay());
    this.container.addEventListener('touchstart', () => this.stopAutoplay(), { passive: true });

    this.startAutoplay();
  }

  createPagination() {
    this.slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.addEventListener('click', () => this.goToSlide(index));
      this.pagination.appendChild(dot);
    });
  }

  handleScroll() {
    // Determine current active slide based on scroll width position matches
    const width = this.track.clientWidth;
    const newIndex = Math.round(this.track.scrollLeft / width);
    
    if (newIndex !== this.currentIndex && newIndex >= 0 && newIndex < this.slides.length) {
      this.currentIndex = newIndex;
      this.updateUI();
    }
  }

  scrollSlide(direction) {
    let targetIndex = this.currentIndex + direction;
    
    // Loop slides gracefully
    if (targetIndex < 0) targetIndex = this.slides.length - 1;
    if (targetIndex >= this.slides.length) targetIndex = 0;

    this.goToSlide(targetIndex);
  }

  goToSlide(index) {
    const width = this.track.clientWidth;
    this.track.scrollTo({
      left: index * width,
      behavior: 'smooth'
    });
  }

  updateUI() {
    // 1. Update Counter
    if (this.counter) {
      this.counter.textContent = `${this.currentIndex + 1} / ${this.slides.length}`;
    }

    // 2. Update Pagination Dots
    const dots = this.pagination.querySelectorAll('.slider-pagination > .dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === this.currentIndex);
    });
  }

  startAutoplay() {
    if (!this.options.autoplay) return;
    this.stopAutoplay(); // Clear duplicates
    this.autoplayTimer = setInterval(() => this.scrollSlide(1), this.options.interval);
  }

  stopAutoplay() {
    if (this.autoplayTimer) clearInterval(this.autoplayTimer);
  }
}

// Instantiate slider when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ModernSlider('mySlider', {
    autoplay: true,
    interval: 5000 // 5 seconds
  });
});
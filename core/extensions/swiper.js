class ModernSwiper {
  // Encapsulated Private Variables
  #swiper;
  #track;
  #slides;
  #currentIndex = 0;
  #totalSlides = 0;
  #autoplayTimer = null;
  #autoplayDelay = 0;
  
  // Optional Elements
  #prevBtn;
  #nextBtn;
  #pagination;
  #counterCurrent;
  #counterTotal;

  constructor(element, options = {}) {
    if (!element) return;

    this.#swiper = element;
    this.#track = element.querySelector('.swiper-track');
    this.#slides = [...element.querySelectorAll('.swiper-slide')];
    
    this.#totalSlides = this.#slides.length;
    this.#autoplayDelay = options.autoplayDelay || 0; // Pure JS config, no HTML data- attributes

    // Detect optional elements if present in the DOM
    this.#prevBtn = element.querySelector('.swiper-arrow.prev');
    this.#nextBtn = element.querySelector('.swiper-arrow.next');
    this.#pagination = element.querySelector('.swiper-pagination');
    this.#counterCurrent = element.querySelector('.swiper-counter .current');
    this.#counterTotal = element.querySelector('.swiper-counter .total');

    this.#init();
  }

  #init() {
    this.#setupOptionalUI();
    this.#bindEvents();
    this.#updateUI();
    this.#startAutoplay();
  }

  #setupOptionalUI() {
    if (this.#counterTotal) this.#counterTotal.textContent = this.#totalSlides;

    // Build modern pagination points via mapping array strings natively
    if (this.#pagination) {
      this.#pagination.innerHTML = this.#slides
        .map((_, i) => `<span class="swiper-dot" data-idx="${i}"></span>`)
        .join('');
    }
  }

  #bindEvents() {
    // 100% modern way to detect current active slide contextually
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.#currentIndex = this.#slides.indexOf(entry.target);
          this.#updateUI();
        }
      });
    }, { root: this.#track, threshold: 0.6 });

    this.#slides.forEach(slide => observer.observe(slide));

    // Optional Event Listeners using Optional Chaining (?.)
    this.#prevBtn?.addEventListener('click', () => this.scrollTo(this.#currentIndex - 1));
    this.#nextBtn?.addEventListener('click', () => this.scrollTo(this.#currentIndex + 1));

    this.#pagination?.addEventListener('click', (e) => {
      const dot = e.target.closest('.swiper-dot');
      if (dot) this.scrollTo(parseInt(dot.dataset.idx));
    });

    // Pause autoplay on physical interaction or mouse hover
    this.#track.addEventListener('pointerdown', () => this.#stopAutoplay());
    this.#track.addEventListener('pointerup', () => this.#startAutoplay());
    this.#swiper.addEventListener('mouseenter', () => this.#stopAutoplay());
    this.#swiper.addEventListener('mouseleave', () => this.#startAutoplay());

    // Page Visibility API: Stop processing cycles if tab isn't viewed
    document.addEventListener('visibilitychange', () => {
      document.hidden ? this.#stopAutoplay() : this.#startAutoplay();
    });
  }

  scrollTo(index) {
    if (index < 0) index = this.#totalSlides - 1;
    if (index >= this.#totalSlides) index = 0;

    this.#currentIndex = index;
    
    // Modern Browser API: Avoids manual layout width / math equations
    //this.#slides[this.#currentIndex].scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start'});

    // iOS SAFE METHOD:
    // Calculates exact position inside the track instead of risking 
    // the whole page jumping with scrollIntoView()
    const slide = this.#slides[this.#currentIndex];
    
    this.#track.scrollTo({left: slide.offsetLeft, behavior: 'smooth'});
  }

  #updateUI() {
    if (this.#counterCurrent) this.#counterCurrent.textContent = this.#currentIndex + 1;

    if (this.#pagination) {
      const dots = this.#pagination.querySelectorAll('.swiper-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === this.#currentIndex);
      });
    }
  }

  #startAutoplay() {
    if (this.#autoplayDelay <= 0) return;
    this.#stopAutoplay();
    this.#autoplayTimer = setInterval(() => {
      this.scrollTo(this.#currentIndex + 1);
    }, this.#autoplayDelay);
  }

  #stopAutoplay() {
    if (this.#autoplayTimer) {
      clearInterval(this.#autoplayTimer);
      this.#autoplayTimer = null;
    }
  }
}

// Modern Initialization: Loop and instantiate directly via configuration variables
document.querySelectorAll('.modern-swiper').forEach(el => {
  new ModernSwiper(el, {
    autoplayDelay: 5000 // Configuration happens directly in JavaScript here
  });
});

//<button class="swiper-arrow prev" aria-label="Previous slide">❮</button>
//<button class="swiper-arrow next" aria-label="Next slide">❯</button>
//<div class="swiper-pagination"></div>
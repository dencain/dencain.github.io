//Ticker
$('style').append('.ticker {width: 100%; height: 4rem; overflow: hidden; user-select: none; margin-top: 4rem; & > .track {display: flex; width: max-content; will-change: transform; & > * {height: 4rem; filter: grayscale(100%) brightness(50%); &:first-of-type {margin-left: 4rem;} &:not(&:last-of-type) {margin-right: 4rem;}}}}');

class ModernTicker {
  constructor(element) {
    this.ticker = element;
    this.track = element.querySelector('.ticker > .track');
    
    // Default to 20s if data-speed is missing
    this.duration = parseFloat(this.ticker.dataset.speed) || 30; 
    
    this.init();
  }

  init() {
    // SECURITY CHECK: Ensure track exists
    if (!this.track) {
        console.error("Ticker track not found inside", this.ticker);
        return;
    }

    // 1. Clone items to fill space and guarantee seamless looping
    // We clone ALL children currently in the track
    const items = Array.from(this.track.children);
    items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      this.track.appendChild(clone);
    });

    // 2. FORCE STYLE: Ensure proper width even if CSS is flaky
    this.track.style.display = 'flex';
    this.track.style.width = 'max-content';

    // 3. Trigger the animation
    this.startAnimation();

    // 4. Pause / Play events
    this.track.addEventListener('mouseenter', () => this.animation.pause());
    this.track.addEventListener('mouseleave', () => this.animation.play());
  }

  startAnimation() {
    // Moves exactly half the track width (the length of the original items)
    this.animation = this.track.animate(
      [
        { transform: 'translate3d(0, 0, 0)' },
        { transform: 'translate3d(-50%, 0, 0)' }
      ], 
      {
        duration: this.duration * 1000, 
        iterations: Infinity,
        easing: 'linear'
      }
    );
  }
}

// 5. INSTANT INIT: Runs immediately if elements exist, otherwise waits
function initTickers() {
    const tickers = document.querySelectorAll('.ticker');
    tickers.forEach(ticker => {
        // Prevent double-initialization
        if (!ticker.dataset.initiated) {
            new ModernTicker(ticker);
            ticker.dataset.initiated = "true";
        }
    });
}

// Try running immediately
initTickers();

// Also try running when DOM is ready (covers both bases)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTickers);
} else {
    initTickers();
}
document.addEventListener('DOMContentLoaded', () => {
  // --- Everything below runs after the DOM is fully parsed ---

  const slides = Array.from(document.querySelectorAll('.slide'));
  const dotsContainer = document.querySelector('.dots');
  const carouselEl = document.querySelector('.carousel');

  if (!carouselEl) {
    console.warn('Carousel element not found — check your HTML has <main class="carousel">…</main>');
    return;
  }

  // Build dots dynamically to match slide count
  slides.forEach((s, i) => s.id = `slide-${i + 1}`);
  const dots = slides.map((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'dot';
    btn.type = 'button';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
    btn.setAttribute('aria-controls', `slide-${i + 1}`);
    dotsContainer.appendChild(btn);
    return btn;
  });

  let current = 0;
  const DURATION = 12000; // autoplay interval (ms)
  let timer = null;

  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');

  function goTo(index, { auto = false } = {}) {
    const next = (index + slides.length) % slides.length;
    if (next === current) return;

    slides[current].classList.remove('active');
    slides[next].classList.add('active');

    dots[current].setAttribute('aria-current', 'false');
    dots[next].setAttribute('aria-current', 'true');

    current = next;

    if (!auto) restartAutoplay();
  }

  function nextSlide() { goTo(current + 1, { auto: true }); }

  function restartAutoplay() {
    if (timer) clearInterval(timer);
    timer = setInterval(nextSlide, DURATION);
  }

  function pauseAutoplay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  function resumeAutoplay() {
    if (!mql.matches) restartAutoplay();
  }

  // Hook up dots
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
    dot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(i); }
      if (e.key === 'ArrowRight') goTo(i + 1);
      if (e.key === 'ArrowLeft')  goTo(i - 1);
    });
  });

  // Pause on hover/focus
  carouselEl.addEventListener('focusin',   function () { pauseAutoplay(); });
  carouselEl.addEventListener('focusout',  function () { resumeAutoplay(); });

  // Start
  if (slides.length) {
    slides[0].classList.add('active');
    if (dots.length) dots[0].setAttribute('aria-current', 'true');
    if (!mql.matches) restartAutoplay();
  }

  // React to motion preference changes
  mql.addEventListener?.('change', (e) => {
    if (e.matches) { pauseAutoplay(); }
    else resumeAutoplay();
  });
});

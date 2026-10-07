/**
 * Above The Rest Painters - Main Client Script
 * Handles mobile drawer, Before/After comparison slider, carousel navigation,
 * form submission, and filter tabs.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initBeforeAfterSlider();
  initEstimateForm();
  initServiceCarousel();
  initGalleryFilter();
  initFAQAccordion();
});

/* Mobile Drawer */
function initMobileDrawer() {
  const openBtn = document.querySelector('.mobile-menu-btn');
  const closeBtn = document.querySelector('.mobile-close-btn');
  const drawer = document.querySelector('.mobile-drawer');

  if (!drawer) return;

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* Before & After Interactive Slider */
function initBeforeAfterSlider() {
  const container = document.querySelector('.ba-slider-container');
  if (!container) return;

  const beforeImage = container.querySelector('.ba-image-before');
  const handle = container.querySelector('.ba-handle');
  if (!beforeImage || !handle) return;

  let isDragging = false;

  function setSliderPosition(x) {
    const rect = container.getBoundingClientRect();
    let pos = (x - rect.left) / rect.width;
    if (pos < 0.05) pos = 0.05;
    if (pos > 0.95) pos = 0.95;

    const percentage = pos * 100;
    beforeImage.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  function startDrag(e) {
    isDragging = true;
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    setSliderPosition(clientX);
  }

  function doDrag(e) {
    if (!isDragging) return;
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    setSliderPosition(clientX);
  }

  function stopDrag() {
    isDragging = false;
  }

  handle.addEventListener('mousedown', startDrag);
  handle.addEventListener('touchstart', startDrag, { passive: true });

  window.addEventListener('mousemove', doDrag);
  window.addEventListener('touchmove', doDrag, { passive: true });

  window.addEventListener('mouseup', stopDrag);
  window.addEventListener('touchend', stopDrag);

  // Allow clicking anywhere inside the slider box to reposition
  container.addEventListener('click', (e) => {
    setSliderPosition(e.clientX);
  });
}

/* Service Carousel Scroll */
function initServiceCarousel() {
  const grid = document.querySelector('.services-grid');
  const prevBtn = document.querySelector('.carousel-btn-prev');
  const nextBtn = document.querySelector('.carousel-btn-next');

  if (!grid || !prevBtn || !nextBtn) return;

  prevBtn.addEventListener('click', () => {
    grid.scrollBy({ left: -320, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    grid.scrollBy({ left: 320, behavior: 'smooth' });
  });
}

/* Estimate Form */
function initEstimateForm() {
  const form = document.querySelector('.estimate-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting Request...';

    // Simulate instant secure submission
    setTimeout(() => {
      form.innerHTML = `
        <div style="padding: 30px; text-align: center; background-color: #FEF3E2; border-radius: 12px; border: 1px solid #F08B18;">
          <h3 style="color: #16181B; font-size: 1.4rem; font-weight: 800; margin-bottom: 8px;">Estimate Request Received!</h3>
          <p style="color: #495057; font-size: 1rem; line-height: 1.6; margin-bottom: 16px;">
            Thank you for reaching out to Above The Rest Painters. Fred Ferrer or our project team will review your project details and contact you shortly to confirm your free estimate.
          </p>
          <div style="font-weight: 700; color: #F08B18; font-size: 1.1rem;">
            Direct Call: (813) 810-9703
          </div>
        </div>
      `;
    }, 800);
  });
}

/* Gallery Category Filter */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-filter-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* FAQ Accordion */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      faqItems.forEach(i => i.classList.remove('open'));

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

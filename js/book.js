/**
 * Book Portfolio — Page Flip Controller
 * Uses StPageFlip (page-flip library) for realistic page turning.
 */
(function () {
  'use strict';

  const bookEl = document.getElementById('book');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const pageIndicator = document.getElementById('page-indicator');

  // Determine sizing based on viewport
  function getBookSize() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (vw <= 480) {
      const w = Math.min(vw - 32, 340);
      const h = Math.min(vh - 120, w * 1.45);
      return { width: w, height: h, mode: 'single' };
    }
    if (vw <= 768) {
      const w = Math.min(vw - 40, 380);
      const h = Math.min(vh - 120, w * 1.45);
      return { width: w, height: h, mode: 'single' };
    }
    // Desktop: each page is this size, book shows two
    const w = Math.min(Math.floor((vw - 80) / 2), 420);
    const h = Math.min(vh - 140, Math.floor(w * 1.42));
    return { width: w, height: h, mode: 'double' };
  }

  let pageFlip = null;
  let isFlipping = false;

  function initBook() {
    const size = getBookSize();
    const isMobile = size.mode === 'single';

    // Destroy previous instance if resizing
    if (pageFlip) {
      pageFlip.destroy();
    }

    pageFlip = new St.PageFlip(bookEl, {
      width: size.width,
      height: size.height,
      size: 'fixed',
      minWidth: 280,
      maxWidth: 520,
      minHeight: 400,
      maxHeight: 740,
      showCover: true,
      maxShadowOpacity: 0.6,
      mobileScrollSupport: false,
      clickEventForward: false,
      useMouseEvents: true,
      swipeDistance: 40,
      showPageCorners: true,
      disableFlipByClick: false,
      flippingTime: 600,
      usePortrait: isMobile,
      startZIndex: 0,
      autoSize: false,
      drawShadow: true,
    });

    // Load pages from DOM
    pageFlip.loadFromHTML(document.querySelectorAll('#book .page'));

    // Debounce flipping to prevent rapid clicks breaking animation
    pageFlip.on('flip', function (e) {
      isFlipping = true;
      updatePageIndicator(e.data);
    });

    pageFlip.on('changeState', function (e) {
      if (e.data === 'read') {
        isFlipping = false;
      }
    });

    updatePageIndicator(pageFlip.getCurrentPageIndex());
  }

  function updatePageIndicator(pageIndex) {
    const total = pageFlip.getPageCount();
    pageIndicator.textContent = 'Page ' + (pageIndex + 1) + ' / ' + total;
  }

  // Navigation
  prevBtn.addEventListener('click', function () {
    if (!isFlipping && pageFlip) {
      pageFlip.flipPrev();
    }
  });

  nextBtn.addEventListener('click', function () {
    if (!isFlipping && pageFlip) {
      pageFlip.flipNext();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (isFlipping || !pageFlip) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      pageFlip.flipNext();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      pageFlip.flipPrev();
    }
  });

  // Handle resize with debounce
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      initBook();
    }, 250);
  });

  // Initialize
  initBook();
})();

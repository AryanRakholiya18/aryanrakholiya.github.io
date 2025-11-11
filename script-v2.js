const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox .close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const galleryImages = document.querySelectorAll(".gallery img");

let currentIndex = 0;

galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
    currentIndex = index;
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
});

window.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.style.display = "none";
});


// Before & After Sliders — scoped to #before-after
(function() {
  function initSlider(containerId, afterId, lineSelector, handleSelector) {
    const container = document.getElementById(containerId);
    const afterImg = document.getElementById(afterId);
    const line = container.querySelector(lineSelector);
    const handle = container.querySelector(handleSelector);

    if (!container || !afterImg || !line || !handle) return;

    // percent (0-100) initial center
    let percent = 50;
    let dragging = false;

    function applyClip(p) {
      // clamp p
      if (p < 0) p = 0;
      if (p > 100) p = 100;
      percent = p;
      // update clip-path of after image
      afterImg.style.clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
      // update positions of line & handle
      line.style.left = `${percent}%`;
      handle.style.left = `${percent}%`;
    }

    // initial set
    applyClip(percent);

    function pointerDown(e) {
      dragging = true;
      container.setPointerCapture(e.pointerId);
      move(e);
    }

    function pointerUp(e) {
      dragging = false;
      try { container.releasePointerCapture(e.pointerId); } catch (err) {}
    }

    function move(e) {
      if (!dragging) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX !== undefined) ? e.clientX : (e.touches ? e.touches[0].clientX : 0);
      let offset = x - rect.left;
      let newPercent = (offset / rect.width) * 100;
      applyClip(newPercent);
    }

    // listeners for pointer (works for mouse + touch)
    line.addEventListener('pointerdown', pointerDown);
    handle.addEventListener('pointerdown', pointerDown);

    container.addEventListener('pointermove', move);
    window.addEventListener('pointerup', pointerUp);

    // also allow clicking the container to move slider
    container.addEventListener('click', function(ev) {
      const rect = container.getBoundingClientRect();
      let offset = ev.clientX - rect.left;
      let newPercent = (offset / rect.width) * 100;
      // animate small transition
      applyClip(newPercent);
    });
  }

  // initialize all three sliders (IDs should match your HTML)
  initSlider('slider1', 'after1', '.slider-line', '.handle');
  initSlider('slider2', 'after2', '.slider-line', '.handle');
  initSlider('slider3', 'after3', '.slider-line', '.handle');
})();

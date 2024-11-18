let slideIndex = 1;
let slideInter;
showSlides(slideIndex);
startAutoSlide();

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
  resetAutoSlide();
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

function startAutoSlide() {
  slideInter = setInterval(() => {
    plusSlides(1);
  }, 5000);  // Change slide every 5 seconds
}

function resetAutoSlide() {
  clearInterval(slideInter);
  startAutoSlide();
}
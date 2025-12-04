const iconMenu = document.querySelector(".icon_menu");
const menuList = document.querySelector(".menu_list");
const wrapper = document.querySelector(".wrapper");

iconMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  iconMenu.classList.toggle("open");
  menuList.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  iconMenu.classList.remove("open");
  menuList.classList.remove("open");
});

//======================
// für den bilder spaß
//======================

let currentImage = 0;
const slides = document.querySelectorAll(".slide");
const total = slides.length;

slides[currentImage].classList.add("active");

function showSlide(index) {
  slides[currentImage].classList.remove("active");
  currentImage = (index + total) % total;
  slides[currentImage].classList.add("active");
}

document.querySelector(".arrow.left").addEventListener("click", () => {
  showSlide(currentImage - 1);
});

document.querySelector(".arrow.right").addEventListener("click", () => {
  showSlide(currentImage + 1);
});

const fullscreenViewer = document.getElementById("fullscreenViewer");
const fullscreenImage = document.getElementById("fullscreenImage");
const fsLeft = document.querySelector(".fs-left");
const fsRight = document.querySelector(".fs-right");

slides.forEach((img, index) => {
  img.style.cursor = "zoom-in";

  img.addEventListener("click", () => {
    currentImage = index;
    fullscreenImage.src = slides[currentImage].src;
    fullscreenViewer.style.display = "flex";
    fullscreenViewer.style.flexDirection = "column";
    fullscreenViewer.style.color = "#fff";
  });
});

fullscreenViewer.addEventListener("click", (e) => {
  if (e.target === fullscreenViewer) {
    fullscreenViewer.style.display = "none";
  }
});

fsLeft.addEventListener("click", (e) => {
  e.stopPropagation();
  currentImage = (currentImage - 1 + total) % total;
  fullscreenImage.src = slides[currentImage].src;
});

fsRight.addEventListener("click", (e) => {
  e.stopPropagation();
  currentImage = (currentImage + 1) % total;
  fullscreenImage.src = slides[currentImage].src;
});

let startX = 0;
let endX = 0;
const SWIPE_DISTANCE = 50;

const slider = document.querySelector(".image-slider");

slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe("slider");
});

fullscreenViewer.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

fullscreenViewer.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe("fullscreen");
});

function handleSwipe(mode) {
  let distance = endX - startX;

  if (Math.abs(distance) < SWIPE_DISTANCE) return;

  if (distance < 0) {
    if (mode === "slider") showSlide(currentImage + 1);
    if (mode === "fullscreen") {
      currentImage = (currentImage + 1) % total;
      fullscreenImage.src = slides[currentImage].src;
    }
  } else {
    if (mode === "slider") showSlide(currentImage - 1);
    if (mode === "fullscreen") {
      currentImage = (currentImage - 1 + total) % total;
      fullscreenImage.src = slides[currentImage].src;
    }
  }
}

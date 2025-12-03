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

let currentImage = 0;
const slides = document.querySelectorAll(".slide");
const total = slides.length;

// Show the first image
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

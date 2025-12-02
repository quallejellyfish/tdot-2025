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

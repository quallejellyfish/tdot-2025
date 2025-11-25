const iconMenu = document.querySelector(".icon_menu");
const menuList = document.querySelector(".menu_list");

iconMenu.addEventListener("click", () => {
  iconMenu.classList.toggle("open");
  menuList.classList.toggle("open");
});

// UI Variables
const openHamburger = document.querySelector(".open-slide");
const closeHamburger = document.querySelector("#side-menu");
const sideMenu = document.querySelector("#side-menu");
const navMenu = document.querySelector("nav");

// Event Handler
openHamburger.addEventListener("click", openSlideMenu);
closeHamburger.addEventListener("click", closeSideMenu);

// Open Hamburger Menu
function openSlideMenu() {
  sideMenu.style.visibility = "visible";
  sideMenu.classList.remove("animate-side-menu-closing");
  sideMenu.classList.add("animate-side-menu-opening");
  sideMenu.innerHTML = `
<a href="#" class="btn-close">&times;</a>
<ul id="side-menu-items">
<li class="side-menu-item">
<a href="/" class="side-menu-text">
  <span class="serial-number" id="side-serial-number"
    >01. <br />
  </span>
  Home</a
>
</li>

<li class="side-menu-item">
<a href="/login" class="side-menu-text">
  <span class="serial-number" id="side-serial-number"
    >02. <br />
  </span>

  Login</a
>
</li>
</ul>
`;
}

// Close Hamburger Menu
function closeSideMenu() {
  sideMenu.classList.remove("animate-side-menu-opening");
  sideMenu.classList.add("animate-side-menu-closing");
  sideMenu.style.visibility = "hidden";
}

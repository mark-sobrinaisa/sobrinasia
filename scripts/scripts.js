function on() {
    // display overlay
    const turnOn = document.getElementById("overlay");
    turnOn.style.display = "block";
    // turn off vertical scroll
    const overflow = document.querySelector("body");
    overflow.style.overflow = "hidden";
}

function off() {
    // display overlay
    const turnOff = document.getElementById("overlay");
    turnOff.style.display = "none";
    // turn off vertical scroll
    const overflow = document.querySelector("body");
    overflow.style.overflow = "";
}

/*** MENU RESPONSIVE */

// Toggle to show and hide navbar menu
const navbarMenu = document.getElementById("menu");
const burgerMenu = document.getElementById("burger");

burgerMenu.addEventListener("click", () => {
  navbarMenu.classList.toggle("is-active");
  burgerMenu.classList.toggle("is-active");
});

// Fixed navbar menu on window resizing
window.addEventListener("resize", () => {
  if (window.innerWidth > 992) {
    if (navbarMenu.classList.contains("is-active")) {
      navbarMenu.classList.remove("is-active");
      burgerMenu.classList.remove("is-active");
    }
  }
});

const menuLinks = document.querySelectorAll('a.menu-link');

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Remove active class
    menuLinks.forEach(item => item.classList.remove('active'));
    // Add active class
    link.classList.add('active');
  });
});

/** Carousel */

document.addEventListener('DOMContentLoaded', () => {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  /*if (isMobile) {*/
    const carouselContainer = document.querySelector('.slide-track');
    const images = document.querySelectorAll('.slide-track .slide');

    // Duplicate images
    images.forEach((image) => {
      const clone = image.cloneNode(true);
      carouselContainer.appendChild(clone);
    });
  //}
});

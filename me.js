var typed = new Typed("#text", {
  strings: ["Developer", "Coder"],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true,
});
var typed = new Typed("#map", {
  strings: ["NIMAPAD, PURI, ODISHA, INDIA", "View Location"],
  typeSpeed: 90,
  backSpeed: 30,
  loop: true,
});

const sections = document.querySelectorAll(".container");
const navLinks = document.querySelectorAll(".lk");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

const mobileMenu = document.querySelector(".mobile");
const sidebar = document.querySelector(".sidebar1");

mobileMenu.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});
const cross = document.querySelector(".cross");

cross.addEventListener("click", () => {
  
  sidebar.classList.remove("show");
});

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    sidebar.classList.remove("show");
  });
});

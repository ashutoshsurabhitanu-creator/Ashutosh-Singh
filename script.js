const header = document.querySelector(".header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = [...document.querySelectorAll(".nav-links a")];
const sections = [...document.querySelectorAll("main section[id]")];

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);

  let current = "home";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 150) current = section.id;
  });
  navItems.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

const words = ["digital products.", "responsive websites.", "memorable experiences."];
const typingElement = document.querySelector(".typing");
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeText() {
  const word = words[wordIndex];
  typingElement.textContent = deleting ? word.slice(0, charIndex--) : word.slice(0, charIndex++);

  if (!deleting && charIndex > word.length) {
    deleting = true;
    setTimeout(typeText, 1500);
  } else if (deleting && charIndex < 0) {
    deleting = false;
    charIndex = 0;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeText, 300);
  } else {
    setTimeout(typeText, deleting ? 45 : 80);
  }
}
typeText();

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector(".form-status");
  const data = new FormData(form);
  const subject = encodeURIComponent(data.get("subject"));
  const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`);
  status.textContent = "Opening your email app...";
  window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
});

document.querySelector("#year").textContent = new Date().getFullYear();

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const links = document.querySelectorAll(".site-nav a");
const scrollTopLink = document.querySelector(".scroll-top");

const toggleNav = () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  nav.classList.toggle("is-open");
  document.body.classList.toggle("nav-open", !expanded);
};

navToggle?.addEventListener("click", toggleNav);

links.forEach((link) =>
  link.addEventListener("click", () => {
    if (nav.classList.contains("is-open")) {
      toggleNav();
    }
  })
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const targetId = entry.target.getAttribute("id");
      const activeLink = document.querySelector(`.site-nav a[href="#${targetId}"]`);
      if (!activeLink) return;
      if (entry.isIntersecting) {
        links.forEach((l) => l.classList.remove("is-active"));
        activeLink.classList.add("is-active");
      }
    });
  },
  {
    threshold: 0.4,
  }
);

document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));

const toggleScrollTop = () => {
  const { scrollY } = window;
  scrollTopLink?.classList.toggle("is-visible", scrollY > 400);
};

window.addEventListener("scroll", toggleScrollTop);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

toggleScrollTop();


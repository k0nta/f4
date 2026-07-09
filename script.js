const intro = document.querySelector(".logo-intro");
const pixelWrap = document.querySelector(".logo-intro__pixels");
const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (motionAllowed && intro && pixelWrap) {
  document.body.classList.add("intro-lock");

  const colors = ["#2bb8ba", "#fbbd2f", "#ffffff", "#1b2442"];
  const pixelCount = 70;

  for (let index = 0; index < pixelCount; index += 1) {
    const pixel = document.createElement("span");
    const angle = (Math.PI * 2 * index) / pixelCount;
    const orbit = 150 + (index % 10) * 12;
    const targetX = -154 + (index % 10) * 34;
    const targetY = -94 + Math.floor(index / 10) * 29;

    pixel.style.setProperty("--from-x", `${Math.cos(angle) * orbit}px`);
    pixel.style.setProperty("--from-y", `${Math.sin(angle) * orbit}px`);
    pixel.style.setProperty("--to-x", `${targetX}px`);
    pixel.style.setProperty("--to-y", `${targetY}px`);
    pixel.style.setProperty("--delay", `${80 + index * 12}ms`);
    pixel.style.setProperty("--size", `${8 + (index % 3) * 3}px`);
    pixel.style.setProperty("--color", colors[index % colors.length]);
    pixelWrap.append(pixel);
  }

  window.setTimeout(() => {
    const introLogo = intro.querySelector(".logo-intro__logo");
    const headerLogo = document.querySelector(".brand img");

    if (!introLogo || !headerLogo) {
      intro.classList.add("logo-intro--dock");
      return;
    }

    const introRect = introLogo.getBoundingClientRect();
    const headerRect = headerLogo.getBoundingClientRect();
    const introCenterX = introRect.left + introRect.width / 2;
    const introCenterY = introRect.top + introRect.height / 2;
    const headerCenterX = headerRect.left + headerRect.width / 2;
    const headerCenterY = headerRect.top + headerRect.height / 2;
    const scale = headerRect.width / introRect.width;

    introLogo.style.setProperty("--dock-x", `${Math.round(headerCenterX - introCenterX)}px`);
    introLogo.style.setProperty("--dock-y", `${Math.round(headerCenterY - introCenterY)}px`);
    introLogo.style.setProperty("--dock-scale", scale.toFixed(3));
    intro.classList.add("logo-intro--dock");
  }, 1650);

  window.setTimeout(() => {
    document.body.classList.remove("intro-lock");
    intro.remove();
  }, 3850);
} else {
  intro?.remove();
}

document.documentElement.classList.add("has-motion");

const revealItems = document.querySelectorAll(
  ".section, .advantage-grid article, .zone-card, .zone-stack article, .plan, .gallery__grid button, .final-cta",
);

if (motionAllowed && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const dialog = document.querySelector(".lightbox");
const dialogImage = dialog?.querySelector("img");
const closeButton = dialog?.querySelector(".lightbox__close");

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!dialog || !dialogImage) return;
    dialogImage.src = button.dataset.lightbox || "";
    dialogImage.alt = button.querySelector("img")?.alt || "Изображение Ф4";
    dialog.showModal();
  });
});

closeButton?.addEventListener("click", () => dialog?.close());

dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

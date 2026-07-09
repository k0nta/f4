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

import "@fontsource/anton/latin-400.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/dm-sans/latin-700.css";
import "./style.css";
import { services, results, cycleIndex } from "./content.js";

const dialog = document.querySelector("#service-dialog");
document.querySelectorAll("[data-service]").forEach((button) => {
  button.addEventListener("click", () => {
    const service = services[button.dataset.service];
    document.querySelector("#dialog-heading").textContent = service.title;
    document.querySelector("#dialog-description").textContent =
      service.description;
    document.querySelector("#dialog-note").textContent = service.note;
    document.querySelector("#dialog-services").replaceChildren(
      ...service.items.map((text) => {
        const item = document.createElement("li");
        item.textContent = text;
        return item;
      }),
    );
    dialog.showModal();
  });
});
document
  .querySelector("#close-dialog")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      dialog.close();
  }
});

let resultIndex = 0;
function showResult(direction) {
  resultIndex = cycleIndex(resultIndex, direction, results.length);
  const result = results[resultIndex];
  const image = document.querySelector("#result-image");
  image.src = `/images/${result.image}.webp`;
  image.alt = result.alt;
  document.querySelector("#result-caption").textContent = result.title;
  document.querySelector("#result-index").textContent = String(
    resultIndex + 1,
  ).padStart(2, "0");
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
    image.animate(
      [
        { opacity: 0.55, transform: "scale(1.025)" },
        { opacity: 1, transform: "scale(1)" },
      ],
      { duration: 380, easing: "ease-out" },
    );
}
document
  .querySelector("#previous-result")
  .addEventListener("click", () => showResult(-1));
document
  .querySelector("#next-result")
  .addEventListener("click", () => showResult(1));

if (
  !matchMedia("(prefers-reduced-motion: reduce)").matches &&
  "IntersectionObserver" in window
) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.12 },
  );
  document
    .querySelectorAll(".service-card, .result-photo, .insta-gallery figure")
    .forEach((element) => {
      element.classList.add("reveal");
      observer.observe(element);
    });
}

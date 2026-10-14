import "@fontsource/anton/latin-400.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/dm-sans/latin-700.css";
import "./style.css";
import { services, results, cycleIndex } from "./content.js";
import { createBookingMessage } from "./booking.js";

const dialog = document.querySelector("#booking-dialog");
const bookingForm = document.querySelector("#booking-form");
const bookingArea = document.querySelector("#booking-area");
const bookingDate = document.querySelector("#booking-date");
const serviceContext = document.querySelector("#service-context");
const [localYear, localMonth, localDay] = new Date(Date.now() - new Date().getTimezoneOffset() * 60_000)
  .toISOString()
  .slice(0, 10)
  .split("-");
bookingDate.min = `${localYear}-${localMonth}-${localDay}`;

function openBooking(serviceKey = "") {
  bookingForm.reset();
  document.querySelector("#booking-status").textContent = "";
  document.querySelector("#booking-fallback").hidden = true;
  const service = services[serviceKey];
  document.querySelector("#dialog-heading").textContent = service
    ? `AGENDAR ${service.title}`
    : "CONSULTAR HORÁRIOS";
  document.querySelector("#dialog-description").textContent = service
    ? service.description
    : "Conte qual serviço você procura e quando prefere. A equipe consulta a agenda e confirma a disponibilidade pelo WhatsApp.";
  serviceContext.hidden = !service;
  serviceContext.open = false;
  if (service) {
    bookingArea.value =
      serviceKey === "unhas" ? "Unhas (manicure ou pedicure)" : service.title[0] + service.title.slice(1).toLowerCase();
    document.querySelector("#dialog-note").textContent = service.note;
    document.querySelector("#dialog-services").replaceChildren(
      ...service.items.map((text) => {
        const item = document.createElement("li");
        item.textContent = text;
        return item;
      }),
    );
  }
  dialog.showModal();
  document.querySelector("#booking-name").focus({ preventScroll: true });
}

document.querySelectorAll("[data-service]").forEach((button) => {
  button.addEventListener("click", () => openBooking(button.dataset.service));
});
document
  .querySelectorAll("[data-booking-open]")
  .forEach((button) => button.addEventListener("click", () => openBooking()));
bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(bookingForm));
  const whatsappUrl = new URL("https://wa.me/5513991201050");
  whatsappUrl.searchParams.set("text", createBookingMessage(values));
  const whatsappWindow = window.open(whatsappUrl, "_blank");
  if (whatsappWindow) {
    whatsappWindow.opener = null;
    dialog.close();
  } else {
    document.querySelector("#booking-status").textContent =
      "Seu navegador bloqueou a nova janela. Use o link abaixo para abrir o WhatsApp.";
    const fallback = document.querySelector("#booking-fallback");
    fallback.href = whatsappUrl;
    fallback.hidden = false;
  }
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

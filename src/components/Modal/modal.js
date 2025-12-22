import * as basicLightbox from "basiclightbox";
import modalTemplate from "./modal.html?raw";

let instance = null;

export const openModal = (htmlContent) => {
  // if (instance) instance.close();

  instance ?? instance.close();

  const html = modalTemplate.replace(
    '<div class="modal__content"></div>',
    `<div class="modal__content">${htmlContent}</div>`
  );

  instance = basicLightbox.create(html, {
    onShow: (inst) => {
      inst
        .element()
        .querySelector("[data-modal-close]")
        .addEventListener("click", () => inst.close());
    },
    onClose: () => (instance = null),
  });

  instance.show();
};

// import { openModal } from "../Modal/modal";
// import trailerErrorTemplate from "../Modal/templates/trailer-error.html?raw";

// openModal(
//   trailerErrorTemplate.replace(
//     "{{image}}",
//     "/images/camera.png"
//   )
// );

import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";

export const openModal = (html) => {
  document.querySelectorAll(".basicLightbox").forEach((el) => el.remove());

  const instance = basicLightbox.create(html, {
    onShow: (instance) => {
      const closeBtn = instance.element().querySelector("[data-close]");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => instance.close());
      }
    },
  });

  instance.show();

  const handleEsc = (e) => {
    if (e.key === "Escape") {
      instance.close();
      window.removeEventListener("keydown", handleEsc);
    }
  };

  window.addEventListener("keydown", handleEsc);
};

import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryListRef = document.querySelector(".gallery");
let currentModalInstance = null; // * Current modal pointer

// * Create gallery
const galleryElements = createGalleryElements();
galleryListRef.append(...galleryElements);

// * Listen to image click
galleryListRef.addEventListener("click", onGalleryClick);

function onGalleryClick(e) {
  e.preventDefault();

  if (!e.target.closest(".gallery__item")) {
    return;
  }

  const imageLink = e.target.parentNode.getAttribute("href");
  const imageAlt = e.target.getAttribute("alt");

  const modal = basicLightbox.create(`
    <div> 
      <img src="${imageLink}" alt="${imageAlt}">
    </div>
    `, {
    onShow: onModalShow,
    onClose: onModalClose,
  });

  modal.show();
}

function onModalShow(instance) {
  // * Save instance for further use
  currentModalInstance = instance;

  instance.element().addEventListener("click", onModalInteraction);
  document.addEventListener("keydown", onModalInteraction);
}

function onModalClose(instance) {
  instance.element().removeEventListener("click", onModalInteraction);
  document.removeEventListener("keydown", onModalInteraction);
}

function onModalInteraction(e) {
  // * Not LMB or the Escape button
  if (e.code !== "Escape" && e.button !== 0) {
    return;
  }

  currentModalInstance.close();
}

function createGalleryElements() {
  const itemsElArray = [];
  const { length } = galleryItems;

  for (let i = 0; i < length; i++) {
    const {
      preview: previewSrc,
      original: originalSrc,
      description,
    } = galleryItems[i];

    const item = document.createElement("div");
    item.classList.add("gallery__item");

    const link = document.createElement("a");
    link.classList.add("gallery__link");
    link.setAttribute("href", originalSrc);

    const img = document.createElement("img");
    img.classList.add("gallery__image");
    img.setAttribute("src", previewSrc);
    img.setAttribute("alt", description);
    img.dataset.source = originalSrc;

    link.appendChild(img);
    item.appendChild(link);
    itemsElArray.push(item);
  }

  return itemsElArray;
}

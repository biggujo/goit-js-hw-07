import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryListRef = document.querySelector(".gallery");

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
    <div class="modal">
        <img src="${imageLink}" alt="${imageAlt}">
    </div>
`);

  modal.show();
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
    link.setAttribute("href", originalSrc);

    const img = document.createElement("img");
    img.classList.add("gallery__image", "gallery__link");
    img.setAttribute("src", previewSrc);
    img.setAttribute("alt", description);

    link.appendChild(img);
    item.appendChild(link);
    itemsElArray.push(item);
  }

  return itemsElArray;
}

function getImageSrc(e) {
  return e.target.src;
}

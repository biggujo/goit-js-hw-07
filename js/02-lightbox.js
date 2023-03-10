import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryListRef = document.querySelector(".gallery");

// * Create gallery
const galleryElements = createGalleryElements();
galleryListRef.append(...galleryElements);

function createGalleryElements() {
  const itemsElArray = [];
  const { length } = galleryItems;

  for (let i = 0; i < length; i++) {
    const {
      preview: previewSrc,
      original: originalSrc,
      description,
    } = galleryItems[i];

    const item = document.createElement("a");
    item.classList.add("gallery__item");
    item.setAttribute("href", originalSrc);

    const img = document.createElement("img");
    img.classList.add("gallery__image");
    img.setAttribute("src", previewSrc);
    img.setAttribute("alt", description);

    item.appendChild(img);
    itemsElArray.push(item);
  }

  return itemsElArray;
}

new SimpleLightbox('.gallery a', {
  animationSpeed: 150,
  captionsData: "alt",
  captionDelay: 250,
  disableScroll: true,
  scrollZoom: false, // ! false, as there are library-related errors:
  // ! "simple-lightbox.min.js:1"
  // ! "Unable to preventDefault inside passive event listener invocation."
});

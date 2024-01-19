import { GalleryItem, galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryListRef: HTMLElement | null = document.querySelector(".gallery");
// @ts-ignore
let currentModalInstance: any = null; // * Current modal pointer

if (galleryListRef) {
  // * Create gallery
  const galleryElements = createGalleryElements();

  galleryListRef.append(...galleryElements);

  // * Listen to image click
  galleryListRef.addEventListener("click", onGalleryClick);
}

function onGalleryClick(e: Event) {
  e.preventDefault();

  if (!e.target) {
    return;
  }

  if (!(<HTMLElement>e.target).closest(".gallery__item")) {
    return;
  }

  const imageLink = (<HTMLElement>(<HTMLElement>e.target).parentNode).getAttribute("href");
  const imageAlt = (e.target as HTMLElement).getAttribute("alt");

  // @ts-ignore
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

function onModalShow(instance: any) {
  // * Save instance for further use
  currentModalInstance = instance;

  instance.element().addEventListener("click", onModalInteraction);
  document.addEventListener("keydown", onModalInteraction);
}

function onModalClose(instance: any) {
  instance.element().removeEventListener("click", onModalInteraction);
  document.removeEventListener("keydown", onModalInteraction);
}

function onModalInteraction(e: KeyboardEvent | MouseEvent): void {
  // * Not LMB or the Escape button
  if ("code" in e && e.code !== "Escape") {
    return;
  }

  if ("button" in e && e.button !== 0) {
    return;
  }

  currentModalInstance.close();
}

function createGalleryElements(): Array<HTMLElement> {
  const itemsElArray: Array<HTMLElement> = [];
  const length: number = galleryItems.length;

  for (let i = 0; i < length; i++) {
    const {
      preview: previewSrc,
      original: originalSrc,
      description,
    }: GalleryItem = galleryItems[i];

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

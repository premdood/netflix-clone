import { contentArray } from "./movies-suggestions.js";

const pageContainerElement = document.querySelector(".page-container");
const dialogElement = document.querySelector('.movie-dialog');
const dialogCloseButton = document.querySelector('.close-button');
const heroImageElement = dialogElement.querySelector(".hero-image img");
const heroTitleElement = dialogElement.querySelector(".hero-title img");
const releaseYearTag = dialogElement.querySelector(".release-year");
const ageRatingTag = dialogElement.querySelector(".age-rating");
const contentTypeTag = dialogElement.querySelector(".content-type");
const genreTag = dialogElement.querySelector(".genre");
const contentPlot = dialogElement.querySelector(".plot p");

function makeBodyScrollable() {
  document.body.classList.remove("no-scroll");
}

function makeBodyNonScrollable() {
  document.body.classList.add("no-scroll");
}

function openDialog(event) {
  dialogElement.showModal();
  pageContainerElement.classList.add('blur');
  makeBodyNonScrollable();
  generateDialogContent(event);
  dialogOpeningAnimation();
  trapFocusInsideDialog();
}

function closeDialog() {
  dialogElement.close();
  pageContainerElement.classList.remove('blur');
  makeBodyScrollable();
  dialogClosingAnimation();
}

function trapFocusInsideDialog() {
  const focusableElements = dialogElement.querySelectorAll(".close-button, .movie-info .btn");

  if (focusableElements.length == 0) return;

  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[1];

  dialogElement.addEventListener("keydown", event => {
    if (event.key == "Tab") {
      console.log("pressed Tab");
      if (event.shiftKey) {
        console.log("pressed shift with tab");
        if (document.activeElement == firstFocusableElement) {
          console.log("last focusable element focused");
          lastFocusableElement.focus();
          event.preventDefault();
        }
      } else {
        console.log("didn't pressed shift");
        if (document.activeElement == lastFocusableElement) {
          console.log("first focused element focused");
          firstFocusableElement.focus();
          event.preventDefault();
        }
      }
    }
  });
}

function dialogOpeningAnimation() {
  heroImageElement.classList.add("animate");
  dialogElement.classList.add("animate");
}

function dialogClosingAnimation() {
  heroImageElement.classList.remove("animate");
  dialogElement.classList.remove("animate");
}

function generateGenreTagContent(genreArray) {
  let genreTagContent = "";

  genreArray.forEach(genre => {
    const HTML = `
      <li class="tag">${genre}</li>
    `;
    genreTagContent += HTML;
  });

  return genreTagContent;
}

function generateDialogContent(event) {
  const targetElement = event.target.closest("li");
  let targetElementId = 0;

  const movieContainers = document.querySelectorAll('.suggestions li');
  movieContainers.forEach((movieContainer, index) => {
    if (movieContainer == targetElement) {
      targetElementId = index;
    }
  });

  const dialogElementData = contentArray[targetElementId];
  heroImageElement.src = dialogElementData.heroImageUrl;
  heroTitleElement.src = dialogElementData.titleImageUrl;
  releaseYearTag.textContent = dialogElementData.releaseYear;
  ageRatingTag.textContent = dialogElementData.ageRating;
  contentTypeTag.textContent = dialogElementData.contentType;
  const genreArray = dialogElementData.genre;
  genreTag.innerHTML = generateGenreTagContent(genreArray);
  contentPlot.textContent = dialogElementData.plot;
}

export function attachEventHandlers() {
  const movieContainers = document.querySelectorAll('.suggestions li');

  movieContainers.forEach(movieContainer => {
    movieContainer.addEventListener('click', event => {
      openDialog(event);
    });

    movieContainer.addEventListener('keydown', event => {
      if (event.key == "Enter") {
        event.preventDefault();
        openDialog(event);
      }
    });
  });

  dialogElement.addEventListener("click", event => {
    if (event.target === dialogElement) {
      closeDialog();
    }
  });

  dialogElement.addEventListener('keydown', event => {
    if (event.key == "Escape") {
      closeDialog();
    }
  });

  dialogCloseButton.addEventListener('click', closeDialog);
}
const moviesSlider = document.querySelector('.suggestions');
const leftScrollButtonContainer = document.querySelector('.left-slider-button');
const leftScrollButton = document.querySelector('.suggestions-container .left');
const rightScrollButtonContainer = document.querySelector('.right-slider-button');
const rightScrollButton = document.querySelector('.suggestions-container .right');

function updateButtonVisibility() {
  const scrollLeft = moviesSlider.scrollLeft;
  const scrollWidth = moviesSlider.scrollWidth;
  const clientWidth = moviesSlider.clientWidth;

  if (scrollLeft == 0 || scrollLeft + clientWidth > scrollWidth) {
    leftScrollButtonContainer.classList.add('left-slider-button-disappear');
  } else {
    leftScrollButtonContainer.classList.remove('left-slider-button-disappear');
  }

  if (scrollLeft + clientWidth >= scrollWidth) {
    rightScrollButtonContainer.classList.add('right-slider-button-disappear');
  } else {
    rightScrollButtonContainer.classList.remove('right-slider-button-disappear');
  }
}

function handleLeftClick() {
  /* Scroll amount calculation */
  const sliderWidth = moviesSlider.clientWidth;
  const moviesContainerWidth = moviesSlider.querySelector('li').clientWidth;
  const numberOfMovies = Math.floor(sliderWidth / moviesContainerWidth);
  let scrollAmount = numberOfMovies * moviesContainerWidth;

  moviesSlider.scrollBy({
    left: -scrollAmount,
    behavior: "smooth"
  });

  setTimeout(updateButtonVisibility, 300);
}

function handleRightClick() {
  /* Scroll amount calculation */
  const sliderWidth = moviesSlider.clientWidth;
  const moviesContainerWidth = moviesSlider.querySelector('li').clientWidth;
  const numberOfMovies = Math.floor(sliderWidth / moviesContainerWidth);
  let scrollAmount = numberOfMovies * moviesContainerWidth;

  moviesSlider.scrollBy({
    left: scrollAmount,
    behavior: "smooth"
  });

  setTimeout(updateButtonVisibility, 300);
}

leftScrollButton.addEventListener('click', handleLeftClick);
rightScrollButton.addEventListener('click', handleRightClick);
window.addEventListener('load', () => {
  setTimeout(updateButtonVisibility, 1);
});
moviesSlider.addEventListener('scroll', updateButtonVisibility);

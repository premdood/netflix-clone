import { indianMovies, indianTvShows, globalMoviesEnglish, globalMoviesOtherLanguages, globalTvShowsEnglish, globalTvShowsOtherLanguages } from '../data/suggestions-data.js';
import { attachEventHandlers } from './movie-details.js';

export let contentArray;

const contentOriginElement = document.querySelector('.filter .content-origin select');
const contentTypeElement = document.querySelector('.filter .content-type select');
const moviesSuggestionElement = document.querySelector('.suggestions-container .suggestions');
const selectOptionsValueMap = {
  "indian-movies": indianMovies,
  "indian-tv-shows": indianTvShows,
  "global-movies-english": globalMoviesEnglish,
  "global-movies-other-languages": globalMoviesOtherLanguages,
  "global-tv-shows-english": globalTvShowsEnglish,
  "global-tv-shows-other-languages": globalTvShowsOtherLanguages
};

function handleContentOriginChange() {
  if (contentOriginElement.value == "indian") {
    const ContentTypeOptions = `
      <option value="movies">Movies</option>
      <option value="tv-shows">TV Shows</option>
    `;

    contentTypeElement.innerHTML = ContentTypeOptions;

  } else if (contentOriginElement.value == "global") {
    const ContentTypeOptions = `
      <option value="movies-english">Movies-English</option>
      <option value="movies-other-languages">Movies-Other languages</option>
      <option value="tv-shows-english">TV Shows-English</option>
      <option value="tv-shows-other-languages">TV Shows-Other languages</option>
    `;

    contentTypeElement.innerHTML = ContentTypeOptions;
  }

  handleContentSuggestion();
}

function handleContentSuggestion() {
  let moviesSuggestion = '';
  const contentOrigin = contentOriginElement.value;
  const contentType = contentTypeElement.value;
  const contentNameKebabCase = contentOrigin + "-" + contentType;
  contentArray = selectOptionsValueMap[contentNameKebabCase];
  contentArray.forEach((suggestion) => {
    const movieSuggestion = `
      <li>
        <div class="suggestion-container">
          <div tabindex="0" class="suggestion">
            <div class="img-container">
              <img src=${suggestion.imageUrl} alt="">
            </div>
          </div>
          <span class="text">${suggestion.id}</span>
        </div>
      </li>
    `;

    moviesSuggestion += movieSuggestion;
  });

  moviesSuggestionElement.innerHTML = moviesSuggestion;

  attachEventHandlers();
}

handleContentOriginChange();

contentOriginElement.addEventListener('change', handleContentOriginChange);
contentTypeElement.addEventListener('change', handleContentSuggestion);

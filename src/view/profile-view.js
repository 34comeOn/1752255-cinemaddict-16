import { getProfileStatus } from '../util';
import { createElement } from '../render';

const createProfileRatingTemplate = (watchedMovies) => (
  `<section class="header__profile profile">
  <p class="profile__rating">${getProfileStatus(watchedMovies)}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

export default class ProfileRatingView {
  #element = null;
  #alreadyWatchedMovies = null;

  constructor(alreadyWatchedMovies) {
    this.#alreadyWatchedMovies = alreadyWatchedMovies;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createProfileRatingTemplate(this.#alreadyWatchedMovies);
  }

  removeElement() {
    this.#element = null;
  }
}

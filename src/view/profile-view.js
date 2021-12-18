import { getProfileStatus } from '../service/util.js';
import { createElement } from '../service/render.js';

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
    return `<section class="header__profile profile">
    <p class="profile__rating">${getProfileStatus(this.#alreadyWatchedMovies)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
  }

  removeElement() {
    this.#element = null;
  }
}

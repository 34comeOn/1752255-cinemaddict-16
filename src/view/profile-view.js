import { getProfileStatus } from '../service/util.js';
import AbstractView from './abstract-view.js';

export default class ProfileRatingView extends AbstractView {
  #alreadyWatchedMovies = null;

  constructor(alreadyWatchedMovies) {
    super();
    this.#alreadyWatchedMovies = alreadyWatchedMovies;
  }

  get template() {
    return `<section class="header__profile profile">
    <p class="profile__rating">${getProfileStatus(this.#alreadyWatchedMovies)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
  }
}

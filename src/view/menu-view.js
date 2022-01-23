import AbstractView from './abstract-view.js';

export default class MenuView extends AbstractView {
  #watchlistMovies = null;
  #alreadyWatchedMovies = null;
  #favoriteMovies = null;

  constructor(watchlistMovies, alreadyWatchedMovies, favoriteMovies) {
    super();
    this.#watchlistMovies = watchlistMovies;
    this.#alreadyWatchedMovies = alreadyWatchedMovies;
    this.#favoriteMovies = favoriteMovies;
  }

  get template() {
    return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${this.#watchlistMovies}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${this.#alreadyWatchedMovies}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${this.#favoriteMovies}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
  }
}

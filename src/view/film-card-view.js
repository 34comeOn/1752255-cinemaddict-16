import { getHours, cutDescription } from '../service/util.js';
import AbstractView from './abstract-view.js';

export default class FilmCardView extends AbstractView {
  #movies = null;

  constructor(movies) {
    super();
    this.#movies = movies;
  }

  get template() {
    const {id, filmInfo, comments} = this.#movies;
    return `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${filmInfo.title}</h3>
        <p class="film-card__rating">${filmInfo.totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${filmInfo.release.date.format('YYYY')}</span>
          <span class="film-card__duration">${getHours(filmInfo.runtime)}</span>
          <span class="film-card__genre">${filmInfo.genre[0]}</span>
        </p>
        <img src=${filmInfo.poster} alt="" class="film-card__poster">
        <p class="film-card__description">${cutDescription(filmInfo.description)}</p>
        <span class="film-card__comments">${comments.length} comments</span>
        <form class="film-card__form visually-hidden" action="#" method="post">
          <input class="film-card__input" type="hidden" name="film-id" value="${id}">
        </form>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>`;
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#editClickHandler);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();

    const compairMovieId = (movie) => (
      movie.id === this.#movies.id
    );

    this._callback.editClick(compairMovieId);
  }
}

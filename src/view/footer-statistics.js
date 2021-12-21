import AbstractView from './abstract-view.js';

export default class FooterStatisticsView extends AbstractView {
  #movies = null;

  constructor(movies) {
    super();
    this.#movies = movies;
  }

  get template() {
    return `<p>
    ${this.#movies.length} movies inside
  </p>`;
  }
}

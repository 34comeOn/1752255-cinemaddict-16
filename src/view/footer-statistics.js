import { createElement } from '../render';

const createFooterStatisticsTemplate = (moviesAmount) => (
  `<p>
    ${moviesAmount.length} movies inside
  </p>`
);

export default class FooterStatisticsView {
  #element = null;
  #movies = null;

  constructor(movies) {
    this.#movies = movies;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFooterStatisticsTemplate(this.#movies);
  }

  removeElement() {
    this.#element = null;
  }
}

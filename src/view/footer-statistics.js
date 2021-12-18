import { createElement } from '../service/render.js';

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
    return `<p>
    ${this.#movies.length} movies inside
  </p>`;
  }

  removeElement() {
    this.#element = null;
  }
}

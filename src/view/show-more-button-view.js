import { createElement } from '../service/render.js';

export default class ShowMoreButtonView {
  #element = null;

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return `<button class="films-list__show-more">
    Show more
  </button>`;
  }

  removeElement() {
    this.#element = null;
  }
}

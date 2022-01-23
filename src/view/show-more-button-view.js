import AbstractView from './abstract-view.js';

export default class ShowMoreButtonView extends AbstractView {
  get template() {
    return `<button class="films-list__show-more">
    Show more
  </button>`;
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.addEventListener('click', this.#editClickHandler);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.editClick();
  }
}

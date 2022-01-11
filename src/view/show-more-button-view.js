import AbstractView from './abstract-view.js';

export default class ShowMoreButtonView extends AbstractView {
  get template() {
    return `<button class="films-list__show-more">
    Show more
  </button>`;
  }
}

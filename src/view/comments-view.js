import { getReleaseDate} from '../mock/task.js';
import { createElement } from '../service/render.js';

export default class FilmCommentView {
  #element = null;
  #currentComments = null;

  constructor(currentComments) {
    this.#currentComments = currentComments;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    const {emotion, comment, author} = this.#currentComments;
    return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${getReleaseDate().format('DD MMMM YYYY')}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
  }

  removeElement() {
    this.#element = null;
  }
}

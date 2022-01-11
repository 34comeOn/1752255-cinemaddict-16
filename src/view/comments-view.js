import { getReleaseDate} from '../mock/task.js';
import AbstractView from './abstract-view.js';

export default class FilmCommentView extends AbstractView {
  #currentComments = null;

  constructor(currentComments) {
    super();
    this.#currentComments = currentComments;
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
}

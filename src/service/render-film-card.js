import { render } from '../service/render.js';
import FilmCardView from '../view/film-card-view.js';

export const renderFilmCard = function (container, moviesData, place) {
  const filmCardViewComponenet = new FilmCardView(moviesData);
  render(container, filmCardViewComponenet, place);
};

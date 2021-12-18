import { render } from '../service/render.js';
import FilmCardTemplateView from '../view/film-card-view.js';

export const renderFilmCard = function (container, moviesData, place) {
  const filmCardTemplateViewComponenet = new FilmCardTemplateView(moviesData);
  render(container, filmCardTemplateViewComponenet.element, place);
};

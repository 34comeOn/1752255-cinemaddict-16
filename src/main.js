import { createFilmCard } from './view/film-card-view';
import { createFilmsCatalog } from './view/films-catalog-view';
import { createFooterStatistics } from './view/footer-statistics';
import { createMenu } from './view/menu-view';
import { createPopup } from './view/popup-view';
import { createProfileRating } from './view/profile-view';
import { createShowMoreButton } from './view/show-more-button-view';
import { createSorting } from './view/sorting-view';

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const FILMS_CARDS = 5;

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatisticElement = document.querySelector('.footer__statistics');
const footerElement = document.querySelector('.footer');

renderTemplate(headerElement, createProfileRating(), RenderPosition.BEFOREEND);
renderTemplate(mainElement, createMenu(), RenderPosition.AFTERBEGIN);
renderTemplate(mainElement, createFilmsCatalog(), RenderPosition.BEFOREEND);
renderTemplate(footerStatisticElement, createFooterStatistics(), RenderPosition.AFTERBEGIN);
renderTemplate(footerElement, createPopup(), RenderPosition.AFTEREND);

const menuElement = mainElement.querySelector('.main-navigation');

renderTemplate(menuElement, createSorting(), RenderPosition.AFTEREND);

const filmCardsContainerElement = mainElement.querySelector('.films-list__container');

for (let i = 1; i <= FILMS_CARDS; i++) {
  renderTemplate(filmCardsContainerElement, createFilmCard(), RenderPosition.BEFOREEND);
}

renderTemplate(filmCardsContainerElement, createShowMoreButton(), RenderPosition.AFTEREND);

import { generateMovieData} from './mock/task.js';
import ApplicationPresenter from './presenter/application-presenter.js'

const MOVIE_DATA_OBJECTS = 24;

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatisticElement = document.querySelector('.footer__statistics');
const footerElement = document.querySelector('.footer');

const presenter = new ApplicationPresenter(headerElement, mainElement, footerElement, footerStatisticElement);

const movies = Array.from({length: MOVIE_DATA_OBJECTS}, generateMovieData);
presenter.init(movies);



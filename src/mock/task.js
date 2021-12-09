import { getRandomInteger } from '../util';
import { getRandomArrayElement } from '../util';
import { getBoolean } from '../util';
import { getArrayWithRandomElements } from '../util';
import dayjs from 'dayjs';

const TITLES_ARRAY_MAX_INDEX = 5;
const POSTERS_ARRAY_MAX_INDEX = 4;
const DIRECTORS_ARRAY_MAX_INDEX = 4;
const WRITERS_ARRAY_MAX_INDEX = 2;
const ACTORS_ARRAY_MAX_INDEX = 3;
const REALEASE_COUNTRIES_ARRAY_MAX_INDEX = 3;
const COMMENT_AUTHOR_ARRAY_MAX_INDEX = 4;
const COMMENT_EMOTION_ARRAY_MAX_INDEX = 3;

const MAX_AGE_RATING = 18;
const MIN_RUN_TIME = 5;
const MAX_RUN_TIME = 240;
const MIN_COMMENT_ID = 100;
const MAX_COMMENT_ID = 1000;

const movieTitles = [
  'Friends',
  'La La Land',
  'Whiplash',
  'Thursday',
  'Birdman',
  'My Name Is Khan'
];

const moviePosters = [
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-dance-of-life.jpg'
];

const movieDirectors = [
  'Robert Zemeckis',
  'Alfred Hitchcock',
  'Christopher Nolan',
  'David Fincher',
  'Quentin Tarantino'
];

const movieWriters = [
  ['Bong Joon-ho','Jin-won Han'],
  ['Nicolás Giacobone','Alexander Dinelaris'],
  ['Damien Chazelle']
];

const movieActors = [
  ['Ryan Gosling','Emma Stone'],
  ['Jean Dujardin','John Goodman'],
  ['James Cromwell','Penelope Ann Miller'],
  ['Sandra Bullock','George Clooney']
];

const realeaseCountries = [
  'USA',
  'France',
  'Italy',
  'USSR'
];

const commentAuthor = [
  'Катя',
  'Коля',
  'Маша',
  'Гриша',
  'Ибрагим'
];

const commentEmotion = [
  'smile',
  'sleeping',
  'puke',
  'angry'
];

const allGenres = [
  'comedy',
  'detective',
  'horror',
  'thriller',
  'drama'
];

const getMovieRating = () => (
  (Math.random()*getRandomInteger(1,10)).toFixed(1)
);

const getReleaseDate = () => {
  const ReleaseDate = dayjs('2021-11-01')
    .subtract(getRandomInteger(1,100), 'year')
    .subtract(getRandomInteger(1,10), 'month')
    .add(getRandomInteger(1,29), 'day');

  return ReleaseDate;
};

const getDescription = () => {
  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante';

  const stingArray = text.split('.');

  return getArrayWithRandomElements(stingArray).join('.');
};

const generateComment = () => ({
  'id': getRandomInteger(MIN_COMMENT_ID, MAX_COMMENT_ID),
  'author': getRandomArrayElement(commentAuthor, 0, COMMENT_AUTHOR_ARRAY_MAX_INDEX),
  'comment': getDescription(),
  'date': getReleaseDate(),
  'emotion': getRandomArrayElement(commentEmotion, 0, COMMENT_EMOTION_ARRAY_MAX_INDEX)
});

const generateComments = () => (
  Array.from({length: getRandomInteger(1,8)}, generateComment)
);

const currentComments = generateComments();

const generateMovieData = () => ({
  'id': getRandomInteger(1,100),
  'comments': generateComments(),
  'filmInfo' : {
    'title': getRandomArrayElement(movieTitles, 0, TITLES_ARRAY_MAX_INDEX),
    'alternative_title': getRandomArrayElement(movieTitles, 0, TITLES_ARRAY_MAX_INDEX),
    'totalRating': getMovieRating(),
    'poster': getRandomArrayElement(moviePosters, 0, POSTERS_ARRAY_MAX_INDEX),
    'ageRating': `${getRandomInteger(0,MAX_AGE_RATING)}+`,
    'director': getRandomArrayElement(movieDirectors, 0, DIRECTORS_ARRAY_MAX_INDEX),
    'writers': getRandomArrayElement(movieWriters, 0, WRITERS_ARRAY_MAX_INDEX),
    'actors': getRandomArrayElement(movieActors, 0, ACTORS_ARRAY_MAX_INDEX),
    'release': {
      'date': getReleaseDate(),
      'releaseCountry': getRandomArrayElement(realeaseCountries, 0, REALEASE_COUNTRIES_ARRAY_MAX_INDEX)
    },
    'runtime': getRandomInteger(MIN_RUN_TIME, MAX_RUN_TIME),
    'genre': getArrayWithRandomElements(allGenres),
    'description': getDescription(),
  },
  'user_details': {
    'watchlist': getBoolean(),
    'already_watched': getBoolean(),
    'watching_date': getReleaseDate(),
    'favorite': getBoolean()
  }
});

export {generateMovieData, currentComments, getReleaseDate};

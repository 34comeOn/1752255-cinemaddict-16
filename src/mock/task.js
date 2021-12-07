import { getRandomInteger } from '../util';
import dayjs from 'dayjs';

const getRandomTitle = () => {
  const movieTitles = [
    'Friends',
    'La La Land',
    'Whiplash',
    'Thursday',
    'Birdman',
    'My Name Is Khan'
  ];

  return movieTitles[getRandomInteger(0,5)];
};

const getMovieRating = () => (
  (Math.random()*getRandomInteger(1,10)).toFixed(1)
);

const getPoster = () => {
  const moviePosters = [
    './images/posters/made-for-each-other.png',
    './images/posters/popeye-meets-sinbad.png',
    './images/posters/sagebrush-trail.jpg',
    './images/posters/santa-claus-conquers-the-martians.jpg',
    './images/posters/the-dance-of-life.jpg'
  ];

  return moviePosters[getRandomInteger(0,4)];
};

const getDirector = () => {
  const movieDirector = [
    'Robert Zemeckis',
    'Alfred Hitchcock',
    'Christopher Nolan',
    'David Fincher',
    'Quentin Tarantino'
  ];

  return movieDirector[getRandomInteger(0,4)];
};

const getWriters = () => {
  const movieWriters = [
    ['Bong Joon-ho','Jin-won Han'],
    ['Nicolás Giacobone','Alexander Dinelaris'],
    ['Damien Chazelle']
  ];

  return movieWriters[getRandomInteger(0,2)];
};

const getActors = () => {
  const movieActors = [
    ['Ryan Gosling','Emma Stone'],
    ['Jean Dujardin','John Goodman'],
    ['James Cromwell','Penelope Ann Miller'],
    ['Sandra Bullock','George Clooney']
  ];

  return movieActors[getRandomInteger(0,3)];
};

const getAgeRating = () => (
  getRandomInteger(0,18)
);

const getReleaseDate = () => {
  const ReleaseDate = dayjs('2021-11-01')
    .subtract(getRandomInteger(1,100), 'year')
    .subtract(getRandomInteger(1,10), 'month')
    .add(getRandomInteger(1,29), 'day');

  return ReleaseDate;
};

const getReleaseCountry = () => {
  const realeaseCountries = [
    'USA',
    'France',
    'Italy',
    'USSR'
  ];

  return realeaseCountries[getRandomInteger(0,3)];
};

const getRuntime = () => (
  getRandomInteger(5,240)
);

const getGenre = () => {
  const movieGenres = [];
  const allGenres = [
    'comedy',
    'detective',
    'horror',
    'thriller',
    'drama'
  ];

  for (let i = 0; i <= getRandomInteger(0,3); i++) {
    const randomGenre = allGenres[getRandomInteger(1,4)];

    if (!movieGenres.includes(randomGenre)){
      movieGenres[i] = randomGenre;
    }
  }

  return movieGenres;
};

const booleanTool = Boolean(getRandomInteger(0,1));

const getDescription = () => {
  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante';

  const stingArray = text.split('.');

  const movieDescription = stingArray.map((string) => {
    if(booleanTool) {
      return string;
    }
  }).join('.');

  return movieDescription;
};

const getCommentId = () => (
  getRandomInteger(100,1000)
);

const getCommentAuthor = () => {
  const commentAuthor = [
    'Катя',
    'Коля',
    'Маша',
    'Гриша',
    'Ибрагим'
  ];

  return commentAuthor[getRandomInteger(0,4)];
};

const getCommentEmotion = () => {
  const commentEmotion = [
    'smile',
    'sleeping',
    'puke',
    'angry'
  ];

  return commentEmotion[getRandomInteger(0,3)];
};

const generateComment = () => ({
  'id': getCommentId(),
  'author': getCommentAuthor(),
  'comment': getDescription(),
  'date': getReleaseDate(),
  'emotion': getCommentEmotion()
});

const generateComments = () => (
  Array.from({length: getRandomInteger(1,8)}, generateComment)
);

const currentComments = generateComments();

const generateMovieData = () => ({
  'id': getRandomInteger(1,100),
  'comments': generateComments(),
  'filmInfo' : {
    'title': getRandomTitle(),
    'alternative_title': getRandomTitle(),
    'totalRating': getMovieRating(),
    'poster': getPoster(),
    'ageRating': `${getAgeRating()}+`,
    'director': getDirector(),
    'writers': getWriters(),
    'actors': getActors(),
    'release': {
      'date': getReleaseDate(),
      'releaseCountry': getReleaseCountry()
    },
    'runtime': getRuntime(),
    'genre': getGenre(),
    'description': getDescription(),
  },
  'user_details': {
    'watchlist': Boolean(getRandomInteger(0,1)),
    'already_watched': Boolean(getRandomInteger(0,1)),
    'watching_date': getReleaseDate(),
    'favorite': Boolean(getRandomInteger(0,1))
  }
});

export {generateMovieData, currentComments};

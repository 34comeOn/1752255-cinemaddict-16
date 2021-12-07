const NOVICE_STATUS = 10;
const FAN_STATUS = 20;
const BUFF_STATUS = 21;

import dayjs from 'dayjs';

dayjs.extend(require('dayjs/plugin/relativeTime'));

const MINUTES_IN_HOUR = 60;

const getRandomInteger = (a,b) => {
  const minInteger = Math.ceil(Math.min(a,b));
  const maxInteger = Math.floor(Math.max(a,b));

  return Math.floor(minInteger + Math.random()*(maxInteger - minInteger + 1));
};

const getHours = (runtime) => {
  const minutes = runtime % MINUTES_IN_HOUR;
  const hours = (runtime - minutes) / MINUTES_IN_HOUR;

  return `${hours}h ${minutes}m`;
};

const getRandomTimeAgo = () => (
  dayjs(`2021-12-07 ${getRandomInteger(0,8)}:00`).fromNow()
);

const cutDescription = (text) => {
  if (text.length > 139) {
    const currentText = text.slice(0,139);
    return `${currentText}...`;
  } else {
    return text;
  }
};

const getProfileStatus = (watchedMovies) => {
  let profileStatus;

  if (watchedMovies >= BUFF_STATUS) {
    profileStatus = 'Movie Buff';
  } else if (watchedMovies <= NOVICE_STATUS) {
    profileStatus = 'Novice';
  } else if (watchedMovies <= FAN_STATUS) {
    profileStatus = 'Fan';
  }

  return profileStatus;
};

const getCommentsAmount = (movie) => (
  movie.comments.length
);

const getMovieRating = (movie) => (
  movie.filmInfo.totalRating
);

const compareCommentsAmount = (countA, countB) => {
  const firstNumber = getCommentsAmount(countA);
  const secondNumber = getCommentsAmount(countB);

  return secondNumber-firstNumber;
};

const compareMoviesRating = (countA, countB) => {
  const firstNumber = getMovieRating(countA);
  const secondNumber = getMovieRating(countB);

  return secondNumber - firstNumber;
};

export {getRandomInteger, getHours, getRandomTimeAgo, cutDescription, getProfileStatus, compareCommentsAmount, compareMoviesRating};

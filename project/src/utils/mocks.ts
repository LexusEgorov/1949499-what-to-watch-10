import { nanoid } from '@reduxjs/toolkit';
import { date, image, internet, lorem, random } from 'faker';
import { AuthData } from '../types/auth-data';
import { CommentType } from '../types/comments';
import Film from '../types/film';
import { UserData } from '../types/user-data';

const MAX_RANDOM_ID = 100;
const MAX_RANDOM_RATING = 10;
const MAX_RANDOM_SCORES_COUNT = 10000;
const MAX_FILM_DURATION = 240;
const TOKEN_SIZE = 16;
const COLOR = '#FFFFFF';
const FILM_NAME = 'Aviator';
export const GENRE = 'Comedy';
const RELEASED = 2022;

const getId = () => Math.floor(Math.random() * MAX_RANDOM_ID) + 1;

export const createFakeUser = () : UserData => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: getId(),
  name: internet.userName(),
  token: nanoid(TOKEN_SIZE),
});

export const createFakeAuthData = () : AuthData => ({
  login: internet.email(),
  password: internet.password(),
});

export const createFakeFilmData = () : Film => ({
  id: getId(),
  name: FILM_NAME,
  posterImage: image.imageUrl(),
  previewImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  backgroundColor: COLOR,
  videoLink: image.imageUrl(),
  previewVideoLink: image.imageUrl(),
  description: lorem.paragraph(),
  rating: random.number(MAX_RANDOM_RATING),
  scoresCount: random.number(MAX_RANDOM_SCORES_COUNT),
  director: internet.userName(),
  starring: [internet.userName(), internet.userName()],
  runTime: random.number(MAX_FILM_DURATION),
  genre: GENRE,
  released: RELEASED,
  isFavorite: false,
});

export const createFakeFilmComment = () : CommentType => ({
  comment: lorem.paragraph(),
  date: date.month(),
  id: getId(),
  rating: random.number(MAX_RANDOM_RATING),
  user: {
    id: getId(),
    name: internet.userName(),
  }
});

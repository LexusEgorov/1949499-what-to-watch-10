export enum AppRoute {
  Root = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum FilmTabs {
  Overview = 'OVERVIEW',
  Details = 'DETAILS',
  Reviews = 'REVIEWS',
}

export enum APIRoute {
  Films = '/films',
  Promo = '/promo',
}

export enum RatingLevel {
  Bad = 2,
  Normal = 4,
  Good = 7,
  VeryGood = 8,
}

export const DEFAULT_FILTER = 'All genres';

export const SIMILAR_FILMS_COUNT = 4;

export const FILMS_BLOCK = 8;

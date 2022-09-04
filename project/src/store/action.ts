import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';

const AppAction = {
  REDIRECT_TO_ROUTE: createAction<AppRoute>('app/redirect-to-route'),
};

const Action = {
  APP: AppAction,
};

export {Action};

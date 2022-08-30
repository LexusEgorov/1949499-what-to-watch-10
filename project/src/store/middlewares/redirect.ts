import { Middleware } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import reducer from '../reducer';

type Reducer = ReturnType<typeof reducer>;

export const redirect : Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {
        if(action.type === 'app/redirect-to-route'){
          browserHistory.push(action.payload);
        }

        return next(action);
      };
import { createAction } from '@reduxjs/toolkit';

const Genre = {
  SET: createAction<{genre: string}>('genre/set'),
};

const Action = {
  INIT: createAction('app/init'),
  GENRE: Genre,
};

export {Action};

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { Action } from './store/action';
import { fetchFilmAction, fetchPromoFilmAction } from './store/api-actions';
import { store } from './store/store';


store.dispatch(Action.INIT());
store.dispatch(fetchFilmAction());
store.dispatch(fetchPromoFilmAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);

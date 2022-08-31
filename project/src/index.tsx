import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { checkAuthAction, fetchFilmAction, fetchPromoFilmAction } from './store/api-actions';
import { store } from './store/store';


store.dispatch(fetchFilmAction());
store.dispatch(fetchPromoFilmAction());
store.dispatch(checkAuthAction());

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

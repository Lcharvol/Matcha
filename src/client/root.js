import React from 'react';
import App from '../client/components/App';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import configureStore from './store';

const initialState = {
  user: {
    login: 'lcharvol',
    firstName: 'Lucas',
    lastName: 'Charvolin',
    sexe: 'homme',
    bio: '« Belle plume cherche joli crayon de couleur pour écrire ensemble les plus belles pages de notre vie . Dans la joie de nous décrire, Arc-en-Cielement vôtre ! »',
    avatar: 'https://cdn.intra.42.fr/users/small_lcharvol.jpg',
  },
  users: [
    {
      login: 'lcharvol',
      firstName: 'Lucas',
      lastName: 'Charvolin',
      sexe: 'homme',
      bio: '« Belle plume cherche joli crayon de couleur pour écrire ensemble les plus belles pages de notre vie . Dans la joie de nous décrire, Arc-en-Cielement vôtre ! »',
      avatar: 'https://cdn.intra.42.fr/users/small_lcharvol.jpg',
    },
    {
      login: 'tdouge',
      firstName: 'Thibault',
      lastName: 'Douge',
      sexe: 'homme',
      bio: '« Belle plume cherche joli crayon de couleur pour écrire ensemble les plus belles pages de notre vie . Dans la joie de nous décrire, Arc-en-Cielement vôtre ! »',
      avatar: 'https://cdn.intra.42.fr/users/medium_tdouge.jpg',
    },
  ],
};

const store = configureStore(initialState);

const root = (
  <App>
    <Provider store={store}>
      <Router
        history={browserHistory}
        routes={routes}
      />
    </Provider>
  </App>
);

export default root;

import React from 'react';
import App from '../client/components/App';
import { Router, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import routes from './routes';
import configureStore from './store';

const initialState = {
  user: {
    login: 'tferrari',
    firstName: 'Tony',
    lastName: 'Ferrari',
    sexe: 'man',
    sexualOrientation: 'man',
    interest: [
      'F1',
      'alcool',
      'pate lorain',
      'putes',
      'coke (voir AMD si possible)',
      'serrage de main',
      'fifaLoser'
    ],
    bio: 'Etalon des vosges a la recher d\'une belle jument',
    avatar: 'https://cdn.intra.42.fr/users/medium_tferrari.jpg',
    pictures: [
      'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/300390_2381486783482_2712906_n.jpg?oh=2073ccf38af1c70b2a838fdfe9f9829f&oe=5AA6D073',
      'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/22853348_10208961766716306_1886954900818790076_n.jpg?oh=a156fd79f8986110eee33a07a3309152&oe=5A6A8AF6',
      'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/10488266_10201218175216907_8380426103113966039_n.jpg?oh=fb6f47c3ecda289b5f582388ed746ff6&oe=5A683EEA',
      'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/27055_1427194646775_1302875_n.jpg?oh=b992523c0327b663689873a362687627&oe=5AA1253D',
      'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/521917_4471355228887_523037771_n.jpg?oh=2a7432d020699d41ee4648d33d5c3f45&oe=5AA7132D',
    ],
    throphys: [
      {
        name: 'seducotor',
        icon: 'beer',
        color: 'rgb(46, 204, 113)',
        id: 1,
      },
      {
        name: 'alcool',
        icon: 'heart',
        color: 'rgb(231, 76, 60)',
        id: 2,
      },
    ],
    score: 70,
    like: 0,
  },
  users: [
    {
      login: 'lcharvol',
      firstName: 'Lucas',
      lastName: 'Charvolin',
      sexe: 'man',
      
      bio: '« Belle plume cherche joli crayon de couleur pour écrire ensemble les plus belles pages de notre vie . Dans la joie de nous décrire, Arc-en-Cielement vôtre ! »',
      avatar: 'https://cdn.intra.42.fr/users/large_lcharvol.jpg',
    },
    {
      login: 'tdouge',
      firstName: 'Thibault',
      lastName: 'Douge',
      sexe: 'homme',
      bio: '« Belle plume cherche joli crayon de couleur pour écrire ensemble les plus belles pages de notre vie . Dans la joie de nous décrire, Arc-en-Cielement vôtre ! »',
      avatar: 'https://cdn.intra.42.fr/users/medium_tdouge.jpg',
    }
  ]
};

const store = configureStore(initialState);

const root = (
  <App>
    <MuiThemeProvider>
      <Provider store={store}>
        <Router
          history={browserHistory}
          routes={routes}
        />
      </Provider>
    </MuiThemeProvider>
  </App>
);

export default root;

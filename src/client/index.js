import React from 'react';
import ReactDOM from 'react-dom';
import socketIO from 'socket.io-client';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from '../client/components/App';
import routes from './routes';
import configureStore from './store';
import { reqConnectedUsers } from './request';
import { getConnectedUsers } from './actions/users';

const matchaToken = localStorage.getItem('matchaToken');
const url = 'http://127.0.0.1:3004';
const io = socketIO.connect(url, { query: matchaToken ? `matchaToken=${matchaToken}` : null });

const initialState = {};

const store = configureStore(initialState, io);

const requestConnectedUsers = () => {
  reqConnectedUsers((details) => store.dispatch(getConnectedUsers(details)))
};

io.on('notif', (data) => {
  console.log(data);
});

setInterval(requestConnectedUsers, 1000);

const root = (
  <MuiThemeProvider>
    <Provider store={store}>
      <App>
        <Router
          history={browserHistory}
          routes={routes}
        />
      </App>
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(root, document.getElementById('__MATCHA__'));

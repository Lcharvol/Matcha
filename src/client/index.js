import React from 'react';
import ReactDOM from 'react-dom';
import socketIO from 'socket.io-client';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import App from '../client/components/App';
import routes from './routes';
import configureStore from './store';
import { reqConnectedUsers } from './request';
import { getConnectedUsers } from './actions/users';

const url = 'http://127.0.0.1:3004';
const io = socketIO.connect(url);

io.on('disconnect', () => console.log('socket.io disconnected ...'));
io.on('error', err => console.log(`socket.io error: ${err}`));
io.on('connect', () => console.log('socket.io connected.'));

const initialState = {};

const store = configureStore(initialState, io);

const requestConnectedUsers = () => {
  reqConnectedUsers((details) => store.dispatch(getConnectedUsers(details)))
};

io.on('userConnected', () => {
  requestConnectedUsers();
});
io.on('usersList', () => {
  requestConnectedUsers();
});
// console.log(io);
// io.sockets[1]('notifs', (msg) => {
  // console.log(msg);
// });

setInterval(requestConnectedUsers, 1000);
  // io.on('userDisconnected', () => {
  //   reqConnectedUsers(() => store.dispatch(getConnectedUsers()))
  // });
const muiTheme = getMuiTheme({
  slider: {
    selectionColor: 'rgba(244, 92, 67, 1)',
    handleFillColor: 'rgba(244, 92, 67, 1)'
  }
})
const root = (
  <App>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Provider store={store}>
        <Router
          history={browserHistory}
          routes={routes}
        />
      </Provider>
    </MuiThemeProvider>
  </App>
);

ReactDOM.render(root, document.getElementById('__MATCHA__'));

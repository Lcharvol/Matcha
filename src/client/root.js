import React from 'react';
import ReactDOM from 'react-dom';
import App from '../client/components/App';
import { Router, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import routes from './routes';
import configureStore from './store';
import socketIO from 'socket.io-client';

const url = 'http://127.0.0.1:3004';
const io = socketIO.connect(url);

io.on('disconnect', () => console.log('socket.io disconnected ...'));
io.on('error', err => console.log(`socket.io error: ${err}`));
io.on('connect', () => console.log('socket.io connected.'));
io.on('connected', (data) => {
  console.log('connected', data);
})
const initialState = {};

const store = configureStore(initialState, io);

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

ReactDOM.render(root, document.getElementById('__MATCHA__'));

import React from 'react';
import App from '../client/components/App';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

const root = (
  <App>
    <Router
      history={browserHistory}
      routes={routes}
    />
  </App>
);

export default root;
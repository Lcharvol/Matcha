import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { createLogger } from 'redux-logger';
import reducer from './reducers';


const logger = createLogger({
  collapsed: true,
});

localStorage.setItem('matchaToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI1LCJpYXQiOjE1MTA3NzQ1NjQsImV4cCI6MTUxMDgxMDU2NH0.XHRR9MzeN-AJQQ-QuFkI9AzAErfqsxDxL32OVkllWIg');
const matchaToken = localStorage.getItem('matchaToken');
const http = store => next => action => {
  // console.log('dispatching', action)
  if (action.type && action.type.indexOf('server') === 0) {
      const request = action.type.split(':');
      axios({
        method:'post',
        url:'http://127.0.0.1:3004/login',
      })
        .then(function(response) {
          console.log(response);
        });
  }
  return next(Promise.resolve(action));
  // let result = next(action)
  // console.log('next state', store.getState())
  // return result
}
const configureStore = (initialState) =>
  createStore(
      reducer,
      initialState,
      applyMiddleware(thunk, logger, http),
    );

export default configureStore;

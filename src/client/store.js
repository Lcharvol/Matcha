import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';

const logger = createLogger({
  collapsed: true,
});

const httpMiddleware = () => ({ dispatch, getState }) => {
  console.log(getState, dispatch);
  console.log('httpMiddleware');
  return next => (action) => {
    console.log(action);
     return next(action);
  };
};
const configureStore = (initialState) =>
  createStore(
      reducer,
      initialState,
      applyMiddleware(thunk, logger, httpMiddleware),
    );

export default configureStore;

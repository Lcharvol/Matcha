import createHistory from 'history/createBrowserHistory';

const history = createHistory();

export const push = (path) => {
  history.push(path);
  location.reload();
};

export default history;

import axios from 'axios';

const config = matchaToken => ({
  headers: {'Authorization': "Bearer " + matchaToken},
});

export const checkAuth = (matchaToken) => axios({
  method: 'get',
  url:'http://127.0.0.1:3004/api/user',
  ...config(matchaToken)
});

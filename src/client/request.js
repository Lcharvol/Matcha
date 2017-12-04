import * as Axios from 'axios';

import { LOAD_USERS, LOAD_USER } from './actions/users';

const matchaToken = localStorage.getItem('matchaToken');
const axios = Axios.create({
  baseURL: 'http://127.0.0.1:3004/api/',
  timeout: 3000,
  headers: {'Authorization': "Bearer " + matchaToken},
})


export const reqAuth = () => axios({
  method: 'get',
  url: 'user',
}).catch(err => err);

export const reqDeleteUser = () => axios({
  method: 'delete',
  url: 'user',
});

export const reqGetUser = (id) => axios({
  method: 'get',
  url:`user?id=${id}`,
}).then(({ data, status }) => {
  if (status === 201)
    throw data.details;
  return data.details;
});
export const reqGetNotifs = () => axios({
  method: 'get',
  url: 'user/notifs',
}).then(({ data, status }) => {
  if (status === 201)
  throw data;
  return data;
})

export const reqGetUnseenNotifs = () => axios({
  method: 'get',
  url: 'user/unseenNotifs',
}).then(({ data, status }) => {
  if (status === 201)
  throw data;
  return data;
})
export const reqSeenNotifs = () => axios({
  method: 'put',
  url: 'user/notifs',
}).then(({ data, status }) => {
  if (status === 201)
  throw data;
  return data;
})

export const reqGetLike= (id) => axios({
  method: 'post',
  url:`user/like?id=${id}`,
}).then(({ data, status }) => {
  if (status === 201)
    throw data;
  return data.details;
}).catch(err => err);

export const reqGetLikeStatus = (id) => axios({
  method: 'get',
  url:`user/like?id=${id}`,
}).then(({ data, status }) => {
  if (status === 201)
    throw data;
  return data;
}).catch(err => err);

export const reqConnectedUsers = (getConnectedUsers) => axios({
  method: 'get',
  url: 'user/connected',
}).then(({ data, status }) => {
  if (status === 201)
  throw data;
  getConnectedUsers(data.details);
  return data;
}).catch(err => err);

export const reqLogin = (login, password) => axios.post('user/login', {
  login,
  password,
}).then(({ data, status }) => {
  if (status === 201)
  throw data;
  return data;
}).catch(err => err);

export const reqRegister= (user) => axios.post('user', {
  ...user,
}).then(({ data, status }) => {
  if (status === 201)
  throw data;
  return data;
}).catch(err => err);

export const reqGetAll = (loadUsers, query) => {
  const cleanQuery = JSON.stringify(query);
  const params = `f=${cleanQuery}`;
  return axios({
    method: 'get',
    url:`user/all?${params}`,
  }).then(({ data, status }) => {
    if (status === 201)
      throw data;
    loadUsers(data);
    return data;
  }).catch(err => err);
};

export const reqMe = loadUser => axios({
  method: 'get',
  url: 'user',
}).then(({ data, status }) => {
  if (status === 201)
    throw data;
  loadUser(data);
  return data;
}).catch(err => err);

export const reqUpdateUser = (data) => axios.put('user', {
  ...data,
}).then(({ data, status }) => {
  if (status === 201)
    throw data;
  return data;
}).catch(err => err);

export const reqLostPassword = (login) => axios({
  method: 'get',
  url:`user/lost?login=${login}`,
}).then(({ data, status }) => {
  if (status === 201)
    throw data.details;
  return data.details;
});

export const reqResetPassword = (data) => axios.put('user/reset', {
  ...data,
}).then(({ data, status }) => {
  if (status === 201)
    throw data;
  return data;
});


// export const reqResetPassword = (data) => axios({
//   method: 'post',
//   url:'http://127.0.0.1:3004/reset_password',
//   data,
// }).then(({ data, status }) => {
//   if (status === 201)
//     throw data;
//   return data;
// });

// export const reqUpdateUser = (data) => axios({
//   method: 'put',
//   url:'http://127.0.0.1:3004/reset_password',
//   data,
// }).then(({ data, status }) => {
//   if (status === 201)
//     throw data;
//   return data;
// });

// export const reqGetMe = (data) => axios({
//   method: 'get',
//   url:'http://127.0.0.1:3004/api/user',
//   data,
//   ...config(matchaToken)
// }).then(({ data, status }) => {
//   if (status === 201)
//     throw data;
//   return data;
// });


// export const reqDeleteMe = () => axios({
//   method: 'get',
//   url:`http://127.0.0.1:3004/api/user`,
//   ...config(matchaToken)
// }).then(({ data, status }) => {
//   if (status === 201)
//     throw data;
//   return data;
// });


// // export const reqAddImg = () =>

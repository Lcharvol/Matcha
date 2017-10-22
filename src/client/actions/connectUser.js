export const CONNECTUSER = 'CONNECTUSER';

export const connectUser = login => (dispatch, getState) => {
   dispatch(({ type: CONNECTUSER, login }));
}
export const LIKE = 'LIKE';

export const addLike = login => (dispatch, getState) => dispatch({ type: LIKE, login });

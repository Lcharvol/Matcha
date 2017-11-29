export const LOAD_USER = 'LOAD_USER';

const reducer = (state = {}, action) => {
  switch (action.type) {
      case LOAD_USER: {
        return {...state, details: action.user.details};
      }
      default:
        return state;
  }
};

export default reducer;

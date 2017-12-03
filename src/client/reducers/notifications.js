export const LOAD_NOTIFICATIONS = 'LOAD_NOTIFICATIONS';

const reducer = (state = {}, action) => {
  switch (action.type) {
      case LOAD_NOTIFICATIONS: {
        return {...state, details: action.notifications.details};
      }
      default:
        return state;
  }
};

export default reducer;

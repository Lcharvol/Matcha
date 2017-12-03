import { filter } from 'ramda';
export const LOAD_NOTIFICATIONS = 'LOAD_NOTIFICATIONS';
export const RESET_UNDREAD_NOTIFICATIONS = 'RESET_UNDREAD_NOTIFICATIONS';

const isFalse = notification => !notification.push;

const getUnreadNotifications= notifications => filter(isFalse, notifications);

const reducer = (state = {}, action) => {
  switch (action.type) {
      case LOAD_NOTIFICATIONS: {
        return {...state, details: action.notifications.details, undreadNotifications: getUnreadNotifications(action.notifications.details)};
      }
      case RESET_UNDREAD_NOTIFICATIONS: {
          return {...state, undreadNotifications: 0}
      }
      default:
        return state;
  }
};

export default reducer;

import { filter } from 'ramda';
export const LOAD_NOTIFICATIONS = 'LOAD_NOTIFICATIONS';
export const RESET_UNREAD_NOTIFICATIONS = 'RESET_UNREAD_NOTIFICATIONS';
export const SET_UNREAD_NOTIFICATIONS = 'SET_UNREAD_NOTIFICATIONS';

const isFalse = notification => !notification.push;

const getUnreadNotifications= notifications => filter(isFalse, notifications);

const reducer = (state = { details: [], unreadNotifications: 0}, action) => {
  switch (action.type) {
      case LOAD_NOTIFICATIONS: {
        return {...state, details: action.notifications.details };
      }
      case RESET_UNREAD_NOTIFICATIONS: {
          return {...state, undreadNotifications: 0}
      }
      case SET_UNREAD_NOTIFICATIONS: {
        return {...state, unreadNotifications: action.unreadNotifications}
      }
      default:
        return state;
  }
};

export default reducer;

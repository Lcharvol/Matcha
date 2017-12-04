import { filter } from 'ramda';
import { LOAD_ALL_NOTIFICATIONS, RESET_NOTIF_COMPTEUR, DISPLAY_NOTIF_COMPTEUR, ADD_NEW_NOTIF } from '../actions/notifications';

const reducer = (state = { details: [], unseenNotifications: 0}, action) => {
  switch (action.type) {
      case LOAD_ALL_NOTIFICATIONS: {
        return {...state, allNotifs: action.notifications.details };
      }
      case RESET_NOTIF_COMPTEUR: {
          return {...state, unseenNotifications: 0}
      }
      case DISPLAY_NOTIF_COMPTEUR: {
        return {...state, unseenNotifications: action.unseenNotifications}
      }
      case ADD_NEW_NOTIF: {
        return {...state, unseenNotifications: state.unseenNotifications + 1}
      }
      default:
        return state;
  }
};

export default reducer;

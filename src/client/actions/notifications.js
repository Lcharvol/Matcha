export const LOAD_ALL_NOTIFICATIONS = 'LOAD_ALL_NOTIFICATIONS';
export const RESET_NOTIF_COMPTEUR = 'RESET_NOTIF_COMPTEUR';
export const DISPLAY_NOTIF_COMPTEUR = 'DISPLAY_NOTIF_COMPTEUR';
export const ADD_NEW_NOTIF_D = 'ADD_NEW_NOTIF_D';
export const ADD_NEW_NOTIF = 'ADD_NEW_NOTIF';

export const loadAllNotifications = (notifications) => {
  return { type: LOAD_ALL_NOTIFICATIONS, notifications };
};

export const resetNotifCompteur = () => {
  return { type: RESET_NOTIF_COMPTEUR};
};

export const displayNotifCompteur = (unseenNotifications) => {
  return { type: DISPLAY_NOTIF_COMPTEUR, unseenNotifications };
}

export const addNewNotification = () => {
  return { type: ADD_NEW_NOTIF };
}
export const addNewNotificationDetails = (data) => {
  return { type: ADD_NEW_NOTIF_D, data };
}

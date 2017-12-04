export const LOAD_NOTIFICATIONS = 'LOAD_NOTIFICATIONS';
export const RESET_UNREAD_NOTIFICATIONS = 'RESET_UNREAD_NOTIFICATIONS';
export const SET_UNREAD_NOTIFICATIONS = 'SET_UNREAD_NOTIFICATIONS';

export const loadNotifications = (notifications) => {
  return { type: LOAD_NOTIFICATIONS, notifications};
};

export const resetUnreadNotifications = () => {
  return { type: RESET_UNREAD_NOTIFICATIONS};
};

export const setUnreadNotifications = (unreadNotifications) => {
  return { type: SET_UNREAD_NOTIFICATIONS, unreadNotifications };
}
export const LOAD_NOTIFICATIONS = 'LOAD_NOTIFICATIONS';

export const loadNotifications = (notifications) => {
  return { type: LOAD_NOTIFICATIONS, notifications};
};
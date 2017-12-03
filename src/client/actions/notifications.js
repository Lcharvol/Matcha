export const LOAD_NOTIFICATIONS = 'LOAD_NOTIFICATIONS';
export const RESET_UNDREAD_NOTIFICATIONS = 'RESET_UNDREAD_NOTIFICATIONS';

export const loadNotifications = (notifications) => {
  return { type: LOAD_NOTIFICATIONS, notifications};
};

export const resetUnreadNotifications = () => {
    return { type: RESET_UNDREAD_NOTIFICATIONS};
  };
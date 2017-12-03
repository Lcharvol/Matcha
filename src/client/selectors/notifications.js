import { filter } from 'ramda';

export const getNotifications= state => state.notifications.details;

const isFalse = notification => !notification.push;

export const getUnreadNotifications= state => filter(isFalse, state.notifications.details);
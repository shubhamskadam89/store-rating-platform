import { createContext, useContext } from 'react';

export type NotificationType = 'success' | 'error' | 'info';

export interface NotificationItem {
  id: string;
  message: string;
  type: NotificationType;
}

export interface NotificationContextValue {
  notify: (message: string, type?: NotificationType) => void;
  notifySuccess: (message: string) => void;
  notifyError: (message: string) => void;
  notifyInfo: (message: string) => void;
  dismiss: (id: string) => void;
}

export const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export function useNotification(): NotificationContextValue {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

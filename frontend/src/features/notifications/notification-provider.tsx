import React, { useState, useCallback, useMemo } from 'react';
import {
  NotificationContext,
  type NotificationItem,
  type NotificationType,
} from './notification-context';

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const notify = useCallback(
    (message: string, type: NotificationType = 'info') => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const newItem: NotificationItem = { id, message, type };

      setNotifications((prev) => [...prev, newItem]);

      setTimeout(() => {
        dismiss(id);
      }, 4000);
    },
    [dismiss],
  );

  const notifySuccess = useCallback(
    (message: string) => {
      notify(message, 'success');
    },
    [notify],
  );

  const notifyError = useCallback(
    (message: string) => {
      notify(message, 'error');
    },
    [notify],
  );

  const notifyInfo = useCallback(
    (message: string) => {
      notify(message, 'info');
    },
    [notify],
  );

  const value = useMemo(
    () => ({ notify, notifySuccess, notifyError, notifyInfo, dismiss }),
    [notify, notifySuccess, notifyError, notifyInfo, dismiss],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="toast-container" aria-live="polite" aria-atomic="true">
        <style>{`
          .toast-container {
            position: fixed;
            top: 1.25rem;
            right: 1.25rem;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            pointer-events: none;
            max-width: 420px;
            width: calc(100% - 2.5rem);
          }

          .toast-card {
            pointer-events: auto;
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            padding: 0.85rem 1rem;
            background: #ffffff;
            border-radius: 0.5rem;
            border: 1px solid #e2e8f0;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04);
            animation: toastSlideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            transition: all 0.15s ease;
          }

          @keyframes toastSlideIn {
            from {
              opacity: 0;
              transform: translateY(-8px) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .toast-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-top: 0.4rem;
            flex-shrink: 0;
          }

          .toast-success .toast-indicator {
            background-color: #10b981;
            box-shadow: 0 0 0 3px #d1fae5;
          }

          .toast-error .toast-indicator {
            background-color: #ef4444;
            box-shadow: 0 0 0 3px #fee2e2;
          }

          .toast-info .toast-indicator {
            background-color: #3b82f6;
            box-shadow: 0 0 0 3px #dbeafe;
          }

          .toast-message {
            flex: 1;
            font-size: 0.875rem;
            line-height: 1.4;
            color: #1e293b;
            font-weight: 500;
          }

          .toast-close-btn {
            background: none;
            border: none;
            padding: 0;
            margin: 0;
            color: #94a3b8;
            cursor: pointer;
            font-size: 1.15rem;
            line-height: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.15s;
          }

          .toast-close-btn:hover {
            color: #475569;
          }

          @media (max-width: 480px) {
            .toast-container {
              top: 0.75rem;
              right: 0.75rem;
              left: 0.75rem;
              width: auto;
              max-width: none;
            }
          }
        `}</style>

        {notifications.map((item) => (
          <div key={item.id} className={`toast-card toast-${item.type}`} role="status">
            <span className="toast-indicator" />
            <div className="toast-message">{item.message}</div>
            <button
              type="button"
              className="toast-close-btn"
              onClick={() => dismiss(item.id)}
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

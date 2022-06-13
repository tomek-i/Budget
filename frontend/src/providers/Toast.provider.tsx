import { ToastContext } from '../context/ToastContext';
import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Toast, ToastProps } from '../components/molecules/Toast';

export type ToastProviderProps = {};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  function generateUEID() {
    let first = (Math.random() * 46656) | 0;
    let second = (Math.random() * 46656) | 0;
    const f = ('000' + first.toString(36)).slice(-3);
    const s = ('000' + second.toString(36)).slice(-3);

    return f + s;
  }

  const open = (content: string) =>
    setToasts((currentToasts: ToastProps[]) => {
      let id = generateUEID();

      const newToast: ToastProps = {
        id,
        title: '',
        content,
        destroy: () => close(id),
      };

      return [...currentToasts, newToast];
    });

  const close = (id: string) =>
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    );
  const contextValue = useMemo(() => ({ open }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {createPortal(
        <div className="toasts-wrapper">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              content={toast.content}
              title={toast.title}
              type={toast.type}
              destroy={() => close(toast.id)}
            ></Toast>
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
};

import React, { useState, useCallback } from "react";
import { ToastContext } from "./useToast";
import type { Toast, ShowToastFn } from "./toast.types";
import ToastContainer from "./ToastContainer";

let idCounter = 0;

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast: ShowToastFn = useCallback((message, type = "info", options = {}) => {
    const id = `toast-${idCounter++}`;
    const newToast: Toast = {
      id,
      message,
      type,
      ...options,
    };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
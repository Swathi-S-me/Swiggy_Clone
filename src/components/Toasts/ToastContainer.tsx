import React from "react";
import type { Toast } from "./toast.types";

const toastColors: Record<string, string> = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

const ToastContainer: React.FC<{ toasts: Toast[] }> = ({ toasts }) => {
  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {toasts.map(({ id, message, type, className = '', style = {} }) => (
        <div
          key={id}
          style={style}
          className={`text-white px-4 py-2 rounded shadow ${toastColors[type]} ${className}`}
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
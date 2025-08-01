export type ToastType = "success" | "error" | "info";

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
  className?: string;
  style?: React.CSSProperties;
};

export type ShowToastFn = (
  message: string,
  type?: ToastType,
  options?: {
    className?: string;
    style?: React.CSSProperties;
  }
) => void;

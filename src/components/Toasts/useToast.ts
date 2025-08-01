import { useContext, createContext } from "react";
import type  {ShowToastFn}  from "./toast.types";

export const ToastContext = createContext<ShowToastFn>(() => {});
export const useToast = () => useContext(ToastContext);
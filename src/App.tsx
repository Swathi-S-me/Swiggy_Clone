import ToastProvider from "./components/Toasts/ToastProvider";

import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";


const queryClient = new QueryClient();

function App() {
  return (
    <ToastProvider>
       <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
      
     
    </ToastProvider>
  );
}

export default App;

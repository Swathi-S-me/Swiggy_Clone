import ToastProvider from "./components/Toasts/ToastProvider";

import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";


const queryClient = new QueryClient();

function App() {
  return (
    <ToastProvider>
       <QueryClientProvider client={queryClient}>
         <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
      
     
    </ToastProvider>
  );
}

export default App;

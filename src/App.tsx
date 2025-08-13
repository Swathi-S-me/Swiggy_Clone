import ToastProvider from "./components/Toasts/ToastProvider";

import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./context/AuthContext";
import { LocationProvider } from "./context/LocationContext";

const queryClient = new QueryClient();

function App() {
  return (
    <LocationProvider>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>
      </ToastProvider>
    </LocationProvider>
  );
}

export default App;

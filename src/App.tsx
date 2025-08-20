import ToastProvider from "./components/Toasts/ToastProvider";

import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./context/AuthContext";
import { LocationProvider } from "./context/LocationContext";
import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();

function App() {
  return (
    <LocationProvider>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <CartProvider>
            <RouterProvider router={router} />
            </CartProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ToastProvider>
    </LocationProvider>
  );
}

export default App;

import ToastProvider from "./components/Toasts/ToastProvider";

import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./context/AuthContext";
import { LocationProvider } from "./context/LocationContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";
const queryClient = new QueryClient();

function App() {
  return (
    <LocationProvider>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
           <Provider store={store} >
            <RouterProvider router={router} />
            </Provider>
            
          </AuthProvider>
        </QueryClientProvider>
      </ToastProvider>
    </LocationProvider>
  );
}

export default App;

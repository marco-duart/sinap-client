import { globalStyles } from "./assets/styles/global";
import { Toaster } from "react-hot-toast";
import { toastConfig } from "./configs/toast-config";
import Router from "./routes";
import { AuthProvider } from "./context/auth.context";

globalStyles();

function App() {
  return (
    <AuthProvider>
      <Toaster toastOptions={toastConfig} />
      <Router />
    </AuthProvider>
  );
}

export default App;

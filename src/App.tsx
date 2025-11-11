import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./assets/styles/global-styles";
import theme from "./assets/styles/theme";
import { Toaster } from "react-hot-toast";
import { toastConfig } from "./configs/toast-config";
import Router from "./routes";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Toaster toastOptions={{ ...toastConfig }} />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;

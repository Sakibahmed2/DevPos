import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/routes.jsx";
import { ThemeProvider } from "@mui/material";
import { theme } from "./lib/theme/theme.js";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";

const oAuthClientId = import.meta.env.VITE_APP_OAUTH_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Toaster position="bottom-right" richColors />
        <GoogleOAuthProvider clientId={oAuthClientId}>
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);

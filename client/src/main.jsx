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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Toaster position="bottom-right" richColors />
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);

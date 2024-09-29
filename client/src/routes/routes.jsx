import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/login/LoginPage";
import adminPath from "./adminRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: adminPath,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/login/LoginPage";
import adminPath from "./adminRoutes";
import financeRoutes from "./financeRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: adminPath,
  },
  {
    path: "/",
    element: <App />,
    children: financeRoutes,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;

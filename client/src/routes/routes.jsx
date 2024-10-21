import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout/MainLayout";
import LoginPage from "../pages/login/LoginPage";
import adminPath from "./adminRoutes";
import financeRoutes from "./financeRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: adminPath,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: financeRoutes,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;

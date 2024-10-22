import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout/MainLayout";
import LoginPage from "../pages/login/LoginPage";
import adminPath from "./adminRoutes";
import financeRoutes from "./financeRoutes";
import RegisterPage from "../pages/register/RegisterPage";

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
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default router;

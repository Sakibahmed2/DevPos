import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout/MainLayout";
import LoginPage from "../pages/login/LoginPage";
import adminPath from "./adminRoutes";
import financeRoutes from "./financeRoutes";
import RegisterPage from "../pages/register/RegisterPage";
import PrivateRotes from "./PrivateRotes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRotes>
        <MainLayout />
      </PrivateRotes>
    ),
    children: adminPath,
  },
  {
    path: "/",
    element: (
      <PrivateRotes>
        <MainLayout />
      </PrivateRotes>
    ),
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

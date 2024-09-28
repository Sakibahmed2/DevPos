import ProductsPage from "../pages/Dashboard/AdminDashboard/Products/Products";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";

const adminPath = [
  {
    path: "dashboard",
    element: <DashboardHome />,
  },
  {
    path: "dashboard/products",
    element: <ProductsPage />,
  },
];

export default adminPath;

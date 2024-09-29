import CreateProduct from "../pages/Dashboard/AdminDashboard/CreateProduct/CreateProduct";
import ProductsPage from "../pages/Dashboard/AdminDashboard/Products/Products";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";

const adminPath = [
  {
    path: "/",
    element: <DashboardHome />,
  },
  {
    path: "dashboard/products",
    element: <ProductsPage />,
  },
  {
    path: "dashboard/create-product",
    element: <CreateProduct />,
  },
];

export default adminPath;

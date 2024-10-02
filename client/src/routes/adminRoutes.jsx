import CreateProduct from "../pages/Dashboard/AdminDashboard/CreateProduct/CreateProduct";
import ExpiredProduct from "../pages/Dashboard/AdminDashboard/ExpiredProduct/ExpiredProduct";
import ProductDetail from "../pages/Dashboard/AdminDashboard/ProductDetail/ProductDetail";
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
    path: "dashboard/products/:id",
    element: <ProductDetail />,
  },
  {
    path: "dashboard/create-product",
    element: <CreateProduct />,
  },
  {
    path: "dashboard/expired-products",
    element: <ExpiredProduct />,
  },
];

export default adminPath;

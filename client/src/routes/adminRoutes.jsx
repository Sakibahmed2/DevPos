import Categories from "../pages/Dashboard/AdminDashboard/Categories/Categories";
import CreateProduct from "../pages/Dashboard/AdminDashboard/CreateProduct/CreateProduct";
import ExpiredProduct from "../pages/Dashboard/AdminDashboard/ExpiredProduct/ExpiredProduct";
import LowStocks from "../pages/Dashboard/AdminDashboard/LowStocks/LowStocks";
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
  {
    path: "/dashboard/low-stocks",
    element: <LowStocks />,
  },
  {
    path: "/dashboard/categories",
    element: <Categories />,
  },
];

export default adminPath;

import Brands from "../pages/Dashboard/AdminDashboard/Brands/Brands";
import Categories from "../pages/Dashboard/AdminDashboard/Categories/Categories";
import CreateProduct from "../pages/Dashboard/AdminDashboard/CreateProduct/CreateProduct";
import ExpiredProduct from "../pages/Dashboard/AdminDashboard/ExpiredProduct/ExpiredProduct";
import LowStocks from "../pages/Dashboard/AdminDashboard/LowStocks/LowStocks";
import ProductDetail from "../pages/Dashboard/AdminDashboard/ProductDetail/ProductDetail";
import ProductsPage from "../pages/Dashboard/AdminDashboard/Products/Products";
import SubCategory from "../pages/Dashboard/AdminDashboard/SubCategory/SubCategory";
import Units from "../pages/Dashboard/AdminDashboard/Units/Units";
import VariantAttributes from "../pages/Dashboard/AdminDashboard/VariantAttributes/VariantAttributes";
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
  {
    path: "dashboard/sub-category",
    element: <SubCategory />,
  },
  {
    path: "dashboard/brands",
    element: <Brands />,
  },
  {
    path: "dashboard/units",
    element: <Units />,
  },
  {
    path: "dashboard/variant-attributes",
    element: <VariantAttributes />,
  },
];

export default adminPath;

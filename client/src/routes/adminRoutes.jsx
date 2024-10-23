import Brands from "../pages/Dashboard/AdminDashboard/Brands/Brands";
import Categories from "../pages/Dashboard/AdminDashboard/Categories/Categories";
import CreateProduct from "../pages/Dashboard/AdminDashboard/CreateProduct/CreateProduct";
import ExpiredProduct from "../pages/Dashboard/AdminDashboard/ExpiredProduct/ExpiredProduct";
import Invoices from "../pages/Dashboard/AdminDashboard/Invoices/Invoices";
import LowStocks from "../pages/Dashboard/AdminDashboard/LowStocks/LowStocks";
import ManageStocks from "../pages/Dashboard/AdminDashboard/ManageStocks/ManageStocks";
import PrintBarcode from "../pages/Dashboard/AdminDashboard/PrintBarcode/PrintBarcode";
import PrintQRCode from "../pages/Dashboard/AdminDashboard/PrintQRCode/PrintQRCode";
import ProductDetail from "../pages/Dashboard/AdminDashboard/ProductDetail/ProductDetail";
import EditProduct from "../pages/Dashboard/AdminDashboard/Products/EditProducts";
import ProductsPage from "../pages/Dashboard/AdminDashboard/Products/Products";
import Promo from "../pages/Dashboard/AdminDashboard/Promo/Promo";
import PurchaseOrder from "../pages/Dashboard/AdminDashboard/PurchaseOrder/PurchaseOrder";
import PurchaseReturn from "../pages/Dashboard/AdminDashboard/PurchaseReturn/PurchaseReturn";
import Purchases from "../pages/Dashboard/AdminDashboard/Purchases/Purchases";
import Quotation from "../pages/Dashboard/AdminDashboard/Quotation/Quotation";
import Sales from "../pages/Dashboard/AdminDashboard/Sales/Sales";
import SalesReturn from "../pages/Dashboard/AdminDashboard/SalesReturn/SalesReturn";
import StockAdjustment from "../pages/Dashboard/AdminDashboard/StockAdjustment/StockAdjustment";
import StockTransfer from "../pages/Dashboard/AdminDashboard/StockTransfer/StockTransfer";
import SubCategory from "../pages/Dashboard/AdminDashboard/SubCategory/SubCategory";
import Units from "../pages/Dashboard/AdminDashboard/Units/Units";
import VariantAttributes from "../pages/Dashboard/AdminDashboard/VariantAttributes/VariantAttributes";
import Warranties from "../pages/Dashboard/AdminDashboard/Warranties/Warranties";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";

const adminPath = [
  {
    path: "/",
    element: <DashboardHome />,
  },

  // **** Inventory routes **** //
  {
    path: "/admin/products",
    element: <ProductsPage />,
  },
  {
    path: "/admin/products/:id",
    element: <ProductDetail />,
  },
  {
    path: "/admin/products/edit/:id",
    element: <EditProduct />,
  },
  {
    path: "/admin/create-product",
    element: <CreateProduct />,
  },
  {
    path: "/admin/expired-products",
    element: <ExpiredProduct />,
  },
  {
    path: "/admin/low-stocks",
    element: <LowStocks />,
  },
  {
    path: "/admin/categories",
    element: <Categories />,
  },
  {
    path: "/admin/sub-category",
    element: <SubCategory />,
  },
  {
    path: "/admin/brands",
    element: <Brands />,
  },
  {
    path: "/admin/units",
    element: <Units />,
  },
  {
    path: "/admin/variant-attributes",
    element: <VariantAttributes />,
  },
  {
    path: "/admin/warranties",
    element: <Warranties />,
  },
  {
    path: "/admin/print-barcode",
    element: <PrintBarcode />,
  },
  {
    path: "/admin/print-qrcode",
    element: <PrintQRCode />,
  },

  // **** Stock routes **** //
  {
    path: "/admin/manage-stock",
    element: <ManageStocks />,
  },
  {
    path: "/admin/stock-adjustment",
    element: <StockAdjustment />,
  },
  {
    path: "/admin/stock-transfer",
    element: <StockTransfer />,
  },

  // **** Sales routes **** //
  {
    path: "/admin/sales",
    element: <Sales />,
  },
  {
    path: "/admin/invoices",
    element: <Invoices />,
  },
  {
    path: "/admin/sales-return",
    element: <SalesReturn />,
  },
  {
    path: "/admin/quotation",
    element: <Quotation />,
  },
  // **** Promo routes **** //
  {
    path: "/admin/promo",
    element: <Promo />,
  },
  // **** Purchases routes **** //
  {
    path: "/admin/purchases",
    element: <Purchases />,
  },
  {
    path: "/admin/purchase-order",
    element: <PurchaseOrder />,
  },
  {
    path: "/admin/purchase-return",
    element: <PurchaseReturn />,
  },
];

export default adminPath;

import { authRouter } from "../routes/authRoutes.js";
import { brandRouter } from "../routes/brandRoutes.js";
import { categoriesRouter } from "../routes/categoriesRoutes.js";
import { customerRouter } from "../routes/customerRoutes.js";
import { departmentsRouter } from "../routes/departmentsRoutes.js";
import { designationRouter } from "../routes/designationRoutes.js";
import { expenseCategoryRouter } from "../routes/expenseCategoryRoutes.js";
import { expenseRouter } from "../routes/expensesRoutes.js";
import { manageStockRouter } from "../routes/manageStockRoutes.js";
import { paymentRouter } from "../routes/paymentRoutes.js";
import { productRouter } from "../routes/productRoutes.js";
import { promoRouter } from "../routes/promoRoutes.js";
import { shiftsRouter } from "../routes/shiftsRoutes.js";
import { stockTransferRouter } from "../routes/stockTransferRoutes.js";
import { storeRouter } from "../routes/storeRoutes.js";
import { subCategoryRouter } from "../routes/subCategoryRoutes.js";
import { suppliersRouter } from "../routes/suppliersRoutes.js";
import { unitsRouter } from "../routes/unitsRoutes.js";
import { userRouter } from "../routes/userRoutes.js";
import { variantAttributesRouter } from "../routes/variantAttributesRoutes.js";
import { warehouseRouter } from "../routes/warehouseRoutes.js";
import { warrantyRouter } from "../routes/warrantyRoutes.js";

const routes = [
  {
    path: "/users",
    routes: userRouter,
  },
  {
    path: "/auth",
    routes: authRouter,
  },
  {
    path: "/products",
    routes: productRouter,
  },
  {
    path: "/categories",
    routes: categoriesRouter,
  },
  {
    path: "/sub-categories",
    routes: subCategoryRouter,
  },
  {
    path: "/brands",
    routes: brandRouter,
  },
  {
    path: "/units",
    routes: unitsRouter,
  },
  {
    path: "/variant-attributes",
    routes: variantAttributesRouter,
  },
  {
    path: "/warranties",
    routes: warrantyRouter,
  },
  {
    path: "/manage-stock",
    routes: manageStockRouter,
  },
  {
    path: "/stock-transfers",
    routes: stockTransferRouter,
  },
  {
    path: "/payments",
    routes: paymentRouter,
  },
  {
    path: "/promo",
    routes: promoRouter,
  },

  // Finance routes
  {
    path: "/expenses",
    routes: expenseRouter,
  },
  {
    path: "/expense-categories",
    routes: expenseCategoryRouter,
  },
  {
    path: "/customers",
    routes: customerRouter,
  },
  {
    path: "/suppliers",
    routes: suppliersRouter,
  },
  {
    path: "/warehouses",
    routes: warehouseRouter,
  },
  {
    path: "/stores",
    routes: storeRouter,
  },
  {
    path: "/departments",
    routes: departmentsRouter,
  },
  {
    path: "/designations",
    routes: designationRouter,
  },
  {
    path: "/shifts",
    routes: shiftsRouter,
  },
];

export default routes;

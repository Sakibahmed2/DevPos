import { authRouter } from "../routes/authRoutes.js";
import { brandRouter } from "../routes/brandRoutes.js";
import { categoriesRouter } from "../routes/categoriesRoutes.js";
import { manageStockRouter } from "../routes/manageStockRoutes.js";
import { productRouter } from "../routes/productRoutes.js";
import { stockTransferRouter } from "../routes/stockTransferRoutes.js";
import { storeRouter } from "../routes/storeRoutes.js";
import { subCategoryRouter } from "../routes/subCategoryRoutes.js";
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
    path: "/warehouses",
    routes: warehouseRouter,
  },
  {
    path: "/stores",
    routes: storeRouter,
  },
  {
    path: "/stock-transfers",
    routes: stockTransferRouter,
  },
];

export default routes;

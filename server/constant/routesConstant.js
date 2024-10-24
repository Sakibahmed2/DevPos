import { authRouter } from "../routes/authRoutes.js";
import { brandRouter } from "../routes/brandRoutes.js";
import { categoriesRouter } from "../routes/categoriesRoutes.js";
import { productRouter } from "../routes/productRoutes.js";
import { subCategoryRouter } from "../routes/subCategoryRoutes.js";
import { unitsRouter } from "../routes/unitsRoutes.js";
import { userRouter } from "../routes/userRoutes.js";

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
];

export default routes;

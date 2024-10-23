import { authRouter } from "../routes/authRoutes.js";
import { categoriesRouter } from "../routes/categoriesRoutes.js";
import { productRouter } from "../routes/productRoutes.js";
import { subCategoryRouter } from "../routes/subCategoryRoutes.js";
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
];

export default routes;

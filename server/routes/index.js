import { Router } from "express";
import routes from "../constant/routesConstant.js";

const globalRoute = Router();

routes.forEach((route) => {
  globalRoute.use(route.path, route.routes);
});

export default globalRoute;

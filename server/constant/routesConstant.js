import { attendanceRouter } from "../routes/attendanceRoutes.js";
import { authRouter } from "../routes/authRoutes.js";
import { banIpRouter } from "../routes/banIpRoutes.js";
import { bankAccountRouter } from "../routes/bankAccountRoutes.js";
import { brandRouter } from "../routes/brandRoutes.js";
import { categoriesRouter } from "../routes/categoriesRoutes.js";
import { customerRouter } from "../routes/customerRoutes.js";
import { departmentsRouter } from "../routes/departmentsRoutes.js";
import { designationRouter } from "../routes/designationRoutes.js";
import { employeesRouter } from "../routes/employeesRoutes.js";
import { expenseCategoryRouter } from "../routes/expenseCategoryRoutes.js";
import { expenseRouter } from "../routes/expensesRoutes.js";
import { holidaysRouter } from "../routes/holidaysRoutes.js";
import { leavesRouter } from "../routes/leavesRoutes.js";
import { leaveTypesRouter } from "../routes/leaveTypesRoutes.js";
import { manageStockRouter } from "../routes/manageStockRoutes.js";
import { paymentRouter } from "../routes/paymentRoutes.js";
import { payrollsRouter } from "../routes/payrollsRoutes.js";
import { productRouter } from "../routes/productRoutes.js";
import { promoRouter } from "../routes/promoRoutes.js";
import { purchaseRouter } from "../routes/purchaseRoutes.js";
import { quotationRouter } from "../routes/quotationRoutes.js";
import { roleRouter } from "../routes/roleRoutes.js";
import { salesReturnRouter } from "../routes/salesReturnRoutes.js";
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
    path: "/sale-return",
    routes: salesReturnRouter,
  },
  {
    path: "/quotations",
    routes: quotationRouter,
  },
  {
    path: "/purchase",
    routes: purchaseRouter,
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
  {
    path: "/employees",
    routes: employeesRouter,
  },
  {
    path: "/attendance",
    routes: attendanceRouter,
  },
  {
    path: "/leave-types",
    routes: leaveTypesRouter,
  },
  {
    path: "/leaves",
    routes: leavesRouter,
  },
  {
    path: "/holidays",
    routes: holidaysRouter,
  },
  {
    path: "/payrolls",
    routes: payrollsRouter,
  },
  {
    path: "/roles",
    routes: roleRouter,
  },
  {
    path: "/bank-accounts",
    routes: bankAccountRouter,
  },
  {
    path: "/ban-ip-addresses",
    routes: banIpRouter,
  },
];

export default routes;

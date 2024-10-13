import Customers from "../pages/Dashboard/FinanceDashboard/Customers/Customers";
import Expenses from "../pages/Dashboard/FinanceDashboard/Expenses/Expenses";
import ExpensesCategory from "../pages/Dashboard/FinanceDashboard/ExpensesCategory/ExpensesCategory";
import Stores from "../pages/Dashboard/FinanceDashboard/Stores/Stores";
import Suppliers from "../pages/Dashboard/FinanceDashboard/Suppliers/Suppliers";
import Warehouses from "../pages/Dashboard/FinanceDashboard/Warehouses/Warehouses";

const financeRoutes = [
  // ** Finance & account routes ** //
  {
    path: "finance/expenses",
    element: <Expenses />,
  },
  {
    path: "finance/expenses-category",
    element: <ExpensesCategory />,
  },

  // ** Peoples routes ** //
  {
    path: "finance/customers",
    element: <Customers />,
  },
  {
    path: "finance/suppliers",
    element: <Suppliers />,
  },
  {
    path: "finance/stores",
    element: <Stores />,
  },
  {
    path: "finance/warehouses",
    element: <Warehouses />,
  },
];

export default financeRoutes;

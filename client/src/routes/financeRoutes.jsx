import AdminAttendance from "../pages/Dashboard/FinanceDashboard/AdminAttendance/AdminAttendance";
import Attendance from "../pages/Dashboard/FinanceDashboard/Attendance/Attendance";
import Customers from "../pages/Dashboard/FinanceDashboard/Customers/Customers";
import Departments from "../pages/Dashboard/FinanceDashboard/Departments/Departments";
import Designation from "../pages/Dashboard/FinanceDashboard/Designation/Designation";
import AddNewEmployee from "../pages/Dashboard/FinanceDashboard/Employees/AddNewEmployee";
import EditEmployee from "../pages/Dashboard/FinanceDashboard/Employees/EditEmployee";
import Employees from "../pages/Dashboard/FinanceDashboard/Employees/Employees";
import Expenses from "../pages/Dashboard/FinanceDashboard/Expenses/Expenses";
import ExpensesCategory from "../pages/Dashboard/FinanceDashboard/ExpensesCategory/ExpensesCategory";
import Holidays from "../pages/Dashboard/FinanceDashboard/Holidays/Holidays";
import Leaves from "../pages/Dashboard/FinanceDashboard/Leaves/Leaves";
import Payrolls from "../pages/Dashboard/FinanceDashboard/Payrolls/Payrolls";
import Shifts from "../pages/Dashboard/FinanceDashboard/Shifts/Shifts";
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

  // ** HRM routes ** //
  {
    path: "finance/employees",
    element: <Employees />,
  },
  {
    path: "finance/employees/add-employee",
    element: <AddNewEmployee />,
  },
  {
    path: "finance/employees/edit-employee/:id",
    element: <EditEmployee />,
  },
  {
    path: "finance/departments",
    element: <Departments />,
  },
  {
    path: "finance/designations",
    element: <Designation />,
  },
  {
    path: "finance/shifts",
    element: <Shifts />,
  },
  {
    path: "finance/attendance/employee",
    element: <Attendance />,
  },
  {
    path: "finance/attendance/admin",
    element: <AdminAttendance />,
  },
  {
    path: "finance/leaves",
    element: <Leaves />,
  },
  {
    path: "finance/holidays",
    element: <Holidays />,
  },
  {
    path: "finance/payroll",
    element: <Payrolls />,
  },
];

export default financeRoutes;

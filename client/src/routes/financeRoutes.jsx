import SettingLayout from "../components/layouts/SettingLayout/SettingLayout";
import AdminAttendance from "../pages/Dashboard/FinanceDashboard/AdminAttendance/AdminAttendance";
import AdminLeaves from "../pages/Dashboard/FinanceDashboard/AdminLeaves/AdminLeaves";
import AppSetting from "../pages/Dashboard/FinanceDashboard/AppSetting/AppSetting";
import Attendance from "../pages/Dashboard/FinanceDashboard/Attendance/Attendance";
import BanIPAddress from "../pages/Dashboard/FinanceDashboard/BankIPAddress/BanIPAddress";
import CustomerReport from "../pages/Dashboard/FinanceDashboard/CustomerReport/CustomerReport";
import Customers from "../pages/Dashboard/FinanceDashboard/Customers/Customers";
import DeleteAccountRequest from "../pages/Dashboard/FinanceDashboard/DeleteAccountRequest/DeleteAccountRequest";
import Departments from "../pages/Dashboard/FinanceDashboard/Departments/Departments";
import Designation from "../pages/Dashboard/FinanceDashboard/Designation/Designation";
import EmployeeLeaves from "../pages/Dashboard/FinanceDashboard/EmployeeLeaves/EmployeeLeaves";
import AddNewEmployee from "../pages/Dashboard/FinanceDashboard/Employees/AddNewEmployee";
import EditEmployee from "../pages/Dashboard/FinanceDashboard/Employees/EditEmployee";
import Employees from "../pages/Dashboard/FinanceDashboard/Employees/Employees";
import ExpenseReport from "../pages/Dashboard/FinanceDashboard/ExpenseReport/ExpenseReport";
import Expenses from "../pages/Dashboard/FinanceDashboard/Expenses/Expenses";
import ExpensesCategory from "../pages/Dashboard/FinanceDashboard/ExpensesCategory/ExpensesCategory";
import BankAccountSetting from "../pages/Dashboard/FinanceDashboard/FinancialSetting/BankAccountSetting";
import FinancialSetting from "../pages/Dashboard/FinanceDashboard/FinancialSetting/FinancialSetting";
import GeneralSettings from "../pages/Dashboard/FinanceDashboard/GeneralSettings/GeneralSettings";
import NotificationSetting from "../pages/Dashboard/FinanceDashboard/GeneralSettings/NotificationSetting";
import SecuritySetting from "../pages/Dashboard/FinanceDashboard/GeneralSettings/SecuritySetting";
import Holidays from "../pages/Dashboard/FinanceDashboard/Holidays/Holidays";
import IncomeReport from "../pages/Dashboard/FinanceDashboard/IncomeReport/IncomeReport";
import InventoryReport from "../pages/Dashboard/FinanceDashboard/InventoryReport/InventoryReport";
import InvoiceReport from "../pages/Dashboard/FinanceDashboard/InvoiceReport/InvoiceReport";
import LeaveTypes from "../pages/Dashboard/FinanceDashboard/LeaveTypes/LeaveTypes";
import Payrolls from "../pages/Dashboard/FinanceDashboard/Payrolls/Payrolls";
import Payslip from "../pages/Dashboard/FinanceDashboard/Payrolls/Payslip";
import ProfitLoss from "../pages/Dashboard/FinanceDashboard/ProfitLoss/ProfitLoss";
import PurchaseReport from "../pages/Dashboard/FinanceDashboard/PurchaseReport/PurchaseReport";
import RolesAndPermissions from "../pages/Dashboard/FinanceDashboard/RolesAndPermissions/RolesAndPermissions";
import SalesReport from "../pages/Dashboard/FinanceDashboard/SalesReport/SalesReport";
import Shifts from "../pages/Dashboard/FinanceDashboard/Shifts/Shifts";
import Stores from "../pages/Dashboard/FinanceDashboard/Stores/Stores";
import SupplierReport from "../pages/Dashboard/FinanceDashboard/SupplierReport/SupplierReport";
import Suppliers from "../pages/Dashboard/FinanceDashboard/Suppliers/Suppliers";
import GDPRSettings from "../pages/Dashboard/FinanceDashboard/SystemSettings/GDPRSettings";
import OtpSettings from "../pages/Dashboard/FinanceDashboard/SystemSettings/OtpSettings";
import SystemSettings from "../pages/Dashboard/FinanceDashboard/SystemSettings/SystemSettings";
import TaxReport from "../pages/Dashboard/FinanceDashboard/TaxReport/TaxReport";
import Users from "../pages/Dashboard/FinanceDashboard/Users/Users";
import Warehouses from "../pages/Dashboard/FinanceDashboard/Warehouses/Warehouses";
import CompanySettings from "../pages/Dashboard/FinanceDashboard/WebsiteSettings/CompanySettings";
import LocalizationSettings from "../pages/Dashboard/FinanceDashboard/WebsiteSettings/LocalizationSettings";
import WebsiteSettings from "../pages/Dashboard/FinanceDashboard/WebsiteSettings/WebsiteSettings";
import {
  financeSettingRoute,
  generaleSettingRoute,
  systemSettingRoute,
  websiteSettingRoute,
} from "../utils/settingRoutes";

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
    path: "finance/leave/admin",
    element: <AdminLeaves />,
  },
  {
    path: "finance/leave/employee",
    element: <EmployeeLeaves />,
  },
  {
    path: "finance/leave-types",
    element: <LeaveTypes />,
  },
  {
    path: "finance/holidays",
    element: <Holidays />,
  },
  {
    path: "finance/payroll/employee-salary",
    element: <Payrolls />,
  },
  {
    path: "finance/payroll/payslip/:id",
    element: <Payslip />,
  },

  // ** Reports routes ** //
  {
    path: "finance/sales-report",
    element: <SalesReport />,
  },
  {
    path: "finance/purchase-report",
    element: <PurchaseReport />,
  },
  {
    path: "finance/inventory-report",
    element: <InventoryReport />,
  },
  {
    path: "finance/invoice-report",
    element: <InvoiceReport />,
  },
  {
    path: "finance/supplier-report",
    element: <SupplierReport />,
  },
  {
    path: "finance/customer-report",
    element: <CustomerReport />,
  },
  {
    path: "finance/expanse-report",
    element: <ExpenseReport />,
  },
  {
    path: "finance/income-report",
    element: <IncomeReport />,
  },
  {
    path: "finance/tax-report",
    element: <TaxReport />,
  },
  {
    path: "finance/profit-loss-report",
    element: <ProfitLoss />,
  },

  // ** User management routes ** //
  {
    path: "finance/users",
    element: <Users />,
  },
  {
    path: "finance/role-management",
    element: <RolesAndPermissions />,
  },
  {
    path: "finance/delete-account-request",
    element: <DeleteAccountRequest />,
  },

  // ** Settings routes ** //
  {
    path: "/",
    element: <SettingLayout pathLinks={generaleSettingRoute} />,
    children: [
      {
        path: "finance/general-settings",
        element: <GeneralSettings />,
      },
      {
        path: "finance/security-settings",
        element: <SecuritySetting />,
      },
      {
        path: "finance/notification-settings",
        element: <NotificationSetting />,
      },
    ],
  },
  {
    path: "/",
    element: <SettingLayout pathLinks={websiteSettingRoute} />,
    children: [
      {
        path: "finance/website-settings",
        element: <WebsiteSettings />,
      },
      {
        path: "finance/company-settings",
        element: <CompanySettings />,
      },
      {
        path: "finance/localization-settings",
        element: <LocalizationSettings />,
      },
    ],
  },
  {
    path: "finance/app-settings",
    element: <AppSetting />,
  },
  {
    path: "/",
    element: <SettingLayout pathLinks={systemSettingRoute} />,
    children: [
      {
        path: "finance/system-settings",
        element: <SystemSettings />,
      },
      {
        path: "finance/otp-settings",
        element: <OtpSettings />,
      },
      {
        path: "finance/gdpr-settings",
        element: <GDPRSettings />,
      },
    ],
  },
  {
    path: "/",
    element: <SettingLayout pathLinks={financeSettingRoute} />,
    children: [
      {
        path: "finance/financial-settings",
        element: <FinancialSetting />,
      },
      {
        path: "finance/bank-account",
        element: <BankAccountSetting />,
      },
    ],
  },
  {
    path: "finance/other-settings",
    element: <BanIPAddress />,
  },
];

export default financeRoutes;

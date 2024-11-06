import { USER_ROLE } from "../constants/role";

// Admin icons
import productIcon from "../assets/Dashboard icons/admin/inventory/products.svg";
import createProductIcon from "../assets/Dashboard icons/admin/inventory/create-product.svg";
import expiredProduct from "../assets/Dashboard icons/admin/inventory/expired-products.svg";
import lowStocks from "../assets/Dashboard icons/admin/inventory/low-stocks.svg";
import categories from "../assets/Dashboard icons/admin/inventory/categories.svg";
import subCategory from "../assets/Dashboard icons/admin/inventory/sub-category.svg";
import brandsIcon from "../assets/Dashboard icons/admin/inventory/brands.svg";
import unitsIcon from "../assets/Dashboard icons/admin/inventory/units.svg";
import variantsAttributesIcon from "../assets/Dashboard icons/admin/inventory/varient-attributes.svg";
import warranties from "../assets/Dashboard icons/admin/inventory/warranties.svg";
import printBarcode from "../assets/Dashboard icons/admin/inventory/print-barcode.svg";
import printQRCode from "../assets/Dashboard icons/admin/inventory/print-qrcode.svg";

import manageStocks from "../assets/Dashboard icons/admin/stock/manage-stock.svg";
import stockAdjustment from "../assets/Dashboard icons/admin/stock/stock-adjustment.svg";
import stockTransfer from "../assets/Dashboard icons/admin/stock/stock-transfer.svg";

import salesIcon from "../assets/Dashboard icons/admin/sales/sales-icon.svg";
import invoicesIcon from "../assets/Dashboard icons/admin/sales/invvoices.svg";
import salesReturnIcon from "../assets/Dashboard icons/admin/sales/sales-return.svg";
import quotationIcon from "../assets/Dashboard icons/admin/sales/quotation.svg";

import promoIcon from "../assets/Dashboard icons/admin/promo/promo.svg";

import purchaseIcon from "../assets/Dashboard icons/admin/purchases/purchases.svg";
import purchaseReturnIcon from "../assets/Dashboard icons/admin/purchases/purchaseReturn.svg";
import purchaseOrder from "../assets/Dashboard icons/admin/purchases/purchaseOrder.svg";

// Finance icons
import expanses from "../assets/dashboard icons/finance/expenses.svg";
import customersIcon from "../assets/dashboard icons/finance/peoples/customers.svg";
import storeIcon from "../assets/dashboard icons/finance/peoples/stores.svg";
import suppliersIcon from "../assets/dashboard icons/finance/peoples/suppliers.svg";
import warehousesIcon from "../assets/dashboard icons/finance/peoples/warehouses.svg";

import employeesIcon from "../assets/dashboard icons/finance/hrm/employees.svg";
import departmentsIcon from "../assets/dashboard icons/finance/hrm/departments.svg";
import designationsIcon from "../assets/dashboard icons/finance/hrm/designation.svg";
import shiftsIcon from "../assets/dashboard icons/finance/hrm/shifts.svg";
import attendanceIcon from "../assets/dashboard icons/finance/hrm/attendence.svg";
import leavesIcon from "../assets/dashboard icons/finance/hrm/leaves.svg";
import holidaysIcon from "../assets/dashboard icons/finance/hrm/holidays.svg";
import payrollsIcon from "../assets/dashboard icons/finance/hrm/payrolls.svg";

import salesReportIcon from "../assets/dashboard icons/finance/reports/sales.svg";
import purchaseReportIcon from "../assets/dashboard icons/finance/reports/purchase.svg";
import inventoryReportIcon from "../assets/dashboard icons/finance/reports/inventory.svg";
import invoiceReportIcon from "../assets/dashboard icons/finance/reports/invoice.svg";
import supplierReportIcon from "../assets/dashboard icons/finance/reports/supplier.svg";
import customerReportIcon from "../assets/dashboard icons/finance/reports/customer.svg";
import expenseReportIcon from "../assets/dashboard icons/finance/reports/expense.svg";
import incomeReportIcon from "../assets/dashboard icons/finance/reports/income.svg";
import taxReportIcon from "../assets/dashboard icons/finance/reports/tax.svg";
import profitLossReportIcon from "../assets/dashboard icons/finance/reports/profitLoss.svg";

import usersIcon from "../assets/dashboard icons/finance/userManagement/users.svg";
import rolePermissionsIcon from "../assets/dashboard icons/finance/userManagement/rolePermissions.svg";
import deleteAccountIcon from "../assets/dashboard icons/finance/userManagement/deleteAccount.svg";

import generalSettingIcon from "../assets/dashboard icons/finance/settings/general.svg";
import websiteSettingIcon from "../assets/dashboard icons/finance/settings/website.svg";
import appSettingIcon from "../assets/dashboard icons/finance/settings/app.svg";
import systemSettingIcon from "../assets/dashboard icons/finance/settings/system.svg";
import financialSettingIcon from "../assets/dashboard icons/finance/settings/financial.svg";
import otherSettingIcon from "../assets/dashboard icons/finance/settings/other.svg";

export const sidebarItems = (role) => {
  const menus = [];

  switch (role) {
    case USER_ROLE.SUPER_ADMIN:
      menus.push(
        // **** Inventory sidebar section **** //
        {
          section: "Inventory",
          items: [
            {
              title: "Products",
              path: `admin/products`,
              icon: productIcon,
            },
            {
              title: "Create product",
              path: `admin/create-product`,
              icon: createProductIcon,
            },
            {
              title: "Expired products",
              path: `admin/expired-products`,
              icon: expiredProduct,
            },
            {
              title: "Low stocks",
              path: `admin/low-stocks`,
              icon: lowStocks,
            },
            {
              title: "Categories",
              path: `admin/categories`,
              icon: categories,
            },
            {
              title: "Sub categories",
              path: `admin/sub-category`,
              icon: subCategory,
            },
            {
              title: "Brands",
              path: `admin/brands`,
              icon: brandsIcon,
            },
            {
              title: "Units",
              path: "admin/units",
              icon: unitsIcon,
            },
            {
              title: "Variant attributes",
              path: `admin/variant-attributes`,
              icon: variantsAttributesIcon,
            },
            {
              title: "Warranties",
              path: "admin/warranties",
              icon: warranties,
            },
            {
              title: "Print barcode",
              path: "admin/print-barcode",
              icon: printBarcode,
            },
            {
              title: "Print QR code",
              path: "admin/print-qrcode",
              icon: printQRCode,
            },
          ],
        },

        // **** Stock sidebar section **** //
        {
          section: "Stock",
          items: [
            {
              title: "Manage stock",
              path: "admin/manage-stock",
              icon: manageStocks,
            },
            {
              title: "Stock adjustment",
              path: "admin/stock-adjustment",
              icon: stockAdjustment,
            },
            {
              title: "Stock transfer",
              path: "admin/stock-transfer",
              icon: stockTransfer,
            },
          ],
        },

        // **** Sales sidebar section **** //
        {
          section: "Sales",
          items: [
            {
              title: "Sales",
              path: "admin/sales",
              icon: salesIcon,
            },
            {
              title: "Invoices",
              path: "admin/invoices",
              icon: invoicesIcon,
            },
            {
              title: "Sales return",
              path: "admin/sales-return",
              icon: salesReturnIcon,
            },
            {
              title: "Quotation",
              path: "admin/quotation",
              icon: quotationIcon,
            },
          ],
        },

        // **** Promo sidebar section **** //
        {
          section: "Promo",
          items: [
            {
              title: "Promo",
              path: "admin/promo",
              icon: promoIcon,
            },
          ],
        },

        // **** Purchases sidebar section **** //
        {
          section: "Purchases",
          items: [
            {
              title: "Purchases",
              path: "admin/purchases",
              icon: purchaseIcon,
            },
            {
              title: "Purchase order",
              path: "admin/purchase-order",
              icon: purchaseOrder,
            },
            {
              title: "Purchase return",
              path: "admin/purchase-return",
              icon: purchaseReturnIcon,
            },
          ],
        }
      );
      break;

    case USER_ROLE.FINANCE:
      menus.push(
        // **** Finance & account sidebar section **** //
        {
          section: "Finance & account",
          items: [
            {
              title: "Expanses",
              path: "finance/expenses",
              icon: expanses,
            },
            {
              title: "Expanses category",
              path: "finance/expenses-category",
              icon: categories,
            },
          ],
        },

        // **** Peoples sidebar section **** //
        {
          section: "Peoples",
          items: [
            {
              title: "Customers",
              path: "finance/customers",
              icon: customersIcon,
            },
            {
              title: "Suppliers",
              path: "finance/suppliers",
              icon: suppliersIcon,
            },
            {
              title: "Stores",
              path: "finance/stores",
              icon: storeIcon,
            },
            {
              title: "Warehouses",
              path: "finance/warehouses",
              icon: warehousesIcon,
            },
          ],
        },

        // **** HRM sidebar section **** //
        {
          section: "HRM",
          items: [
            {
              title: "Employees",
              path: "finance/employees",
              icon: employeesIcon,
            },
            {
              title: "Departments",
              path: "finance/departments",
              icon: departmentsIcon,
            },
            {
              title: "Designations",
              path: "finance/designations",
              icon: designationsIcon,
            },
            {
              title: "Shifts",
              path: "finance/shifts",
              icon: shiftsIcon,
            },
            {
              title: "Attendance",
              path: "finance/attendance/employee",
              icon: attendanceIcon,
              children: [
                {
                  title: "Employee",
                  path: "finance/attendance/employee",
                },
                {
                  title: "Admin",
                  path: "finance/attendance/admin",
                },
              ],
            },
            {
              title: "Leaves",
              path: "finance/leave/admin",
              icon: leavesIcon,
              children: [
                {
                  title: "Admin leaves",
                  path: "finance/leave/admin",
                },
                {
                  title: "Employee leaves",
                  path: "finance/leave/employee",
                },
                {
                  title: "Leave types",
                  path: "finance/leave-types",
                },
              ],
            },
            {
              title: "Holidays",
              path: "finance/holidays",
              icon: holidaysIcon,
            },
            {
              title: "Payrolls",
              path: "finance/payroll/employee-salary",
              icon: payrollsIcon,
            },
          ],
        },

        // **** Reports sidebar section **** //
        {
          section: "Reports",
          items: [
            {
              title: "Sales report",
              path: "finance/sales-report",
              icon: salesReportIcon,
            },
            {
              title: "Purchase report",
              path: "finance/purchase-report",
              icon: purchaseReportIcon,
            },
            {
              title: "Inventory report",
              path: "finance/inventory-report",
              icon: inventoryReportIcon,
            },
            {
              title: "Invoice report",
              path: "finance/invoice-report",
              icon: invoiceReportIcon,
            },
            {
              title: "Supplier report",
              path: "finance/supplier-report",
              icon: supplierReportIcon,
            },
            {
              title: "Customer report",
              path: "finance/customer-report",
              icon: customerReportIcon,
            },
            {
              title: "Expense report",
              path: "finance/expanse-report",
              icon: expenseReportIcon,
            },
            {
              title: "Income report",
              path: "finance/income-report",
              icon: incomeReportIcon,
            },
            {
              title: "Tax report",
              path: "finance/tax-report",
              icon: taxReportIcon,
            },
            {
              title: "Profit & loss report",
              path: "finance/profit-loss-report",
              icon: profitLossReportIcon,
            },
          ],
        },

        // **** User management sidebar section **** //
        {
          section: "User management",
          items: [
            {
              title: "Users",
              path: "finance/users",
              icon: usersIcon,
            },
            {
              title: "Role & permissions",
              path: "finance/role-management",
              icon: rolePermissionsIcon,
            },
            {
              title: "Delete account request",
              path: "finance/delete-account-request",
              icon: deleteAccountIcon,
            },
          ],
        },

        // **** Settings sidebar section **** //
        {
          section: "Settings",
          items: [
            {
              title: "General settings",
              path: "finance/general-settings",
              icon: generalSettingIcon,
            },
            {
              title: "Website settings",
              path: "finance/website-settings",
              icon: websiteSettingIcon,
            },
            {
              title: "App settings",
              path: "finance/app-settings",
              icon: appSettingIcon,
            },
            {
              title: "System settings",
              path: "finance/system-settings",
              icon: systemSettingIcon,
            },
            {
              title: "Financial settings",
              path: "finance/financial-settings",
              icon: financialSettingIcon,
            },
            {
              title: "Other settings",
              path: "finance/other-settings",
              icon: otherSettingIcon,
            },
          ],
        }
      );
      break;

    default:
      break;
  }
  return [...menus];
};

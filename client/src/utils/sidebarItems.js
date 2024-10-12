import { USER_ROLE } from "../constants/role";

// admin icons
import productIcon from "../assets/dashboard icons/admin/inventory/products.svg";
import createProductIcon from "../assets/dashboard icons/admin/inventory/create-product.svg";
import expiredProduct from "../assets/dashboard icons/admin/inventory/expired-products.svg";
import lowStocks from "../assets/dashboard icons/admin/inventory/low-stocks.svg";
import categories from "../assets/dashboard icons/admin/inventory/categories.svg";
import subCategory from "../assets/dashboard icons/admin/inventory/sub-category.svg";
import brandsIcon from "../assets/dashboard icons/admin/inventory/brands.svg";
import unitsIcon from "../assets/dashboard icons/admin/inventory/units.svg";
import variantsAttributesIcon from "../assets/dashboard icons/admin/inventory/varient-attributes.svg";
import warranties from "../assets/dashboard icons/admin/inventory/warranties.svg";
import printBarcode from "../assets/dashboard icons/admin/inventory/print-barcode.svg";
import printQRCode from "../assets/dashboard icons/admin/inventory/print-qrcode.svg";

import manageStocks from "../assets/dashboard icons/admin/stock/manage-stock.svg";
import stockAdjustment from "../assets/dashboard icons/admin/stock/stock-adjustment.svg";
import stockTransfer from "../assets/dashboard icons/admin/stock/stock-transfer.svg";

import salesIcon from "../assets/dashboard icons/admin/sales/sales-icon.svg";
import invoicesIcon from "../assets/dashboard icons/admin/sales/invvoices.svg";
import salesReturnIcon from "../assets/dashboard icons/admin/sales/sales-return.svg";
import quotationIcon from "../assets/dashboard icons/admin/sales/quotation.svg";

import promoIcon from "../assets/dashboard icons/admin/promo/promo.svg";

import purchaseIcon from "../assets/dashboard icons/admin/purchases/purchases.svg";
import purchaseReturnIcon from "../assets/dashboard icons/admin/purchases/purchaseReturn.svg";
import purchaseOrder from "../assets/dashboard icons/admin/purchases/purchaseOrder.svg";

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
              path: `dashboard/products`,
              icon: productIcon,
            },
            {
              title: "Create product",
              path: `dashboard/create-product`,
              icon: createProductIcon,
            },
            {
              title: "Expired products",
              path: `dashboard/expired-products`,
              icon: expiredProduct,
            },
            {
              title: "Low stocks",
              path: `dashboard/low-stocks`,
              icon: lowStocks,
            },
            {
              title: "Categories",
              path: `dashboard/categories`,
              icon: categories,
            },
            {
              title: "Sub categories",
              path: `dashboard/sub-category`,
              icon: subCategory,
            },
            {
              title: "Brands",
              path: `dashboard/brands`,
              icon: brandsIcon,
            },
            {
              title: "Units",
              path: "dashboard/units",
              icon: unitsIcon,
            },
            {
              title: "Variant attributes",
              path: `dashboard/variant-attributes`,
              icon: variantsAttributesIcon,
            },
            {
              title: "Warranties",
              path: "dashboard/warranties",
              icon: warranties,
            },
            {
              title: "Print barcode",
              path: "dashboard/print-barcode",
              icon: printBarcode,
            },
            {
              title: "Print QR code",
              path: "dashboard/print-qrcode",
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
              path: "dashboard/manage-stock",
              icon: manageStocks,
            },
            {
              title: "Stock adjustment",
              path: "dashboard/stock-adjustment",
              icon: stockAdjustment,
            },
            {
              title: "Stock transfer",
              path: "dashboard/stock-transfer",
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
              path: "dashboard/sales",
              icon: salesIcon,
            },
            {
              title: "Invoices",
              path: "dashboard/invoices",
              icon: invoicesIcon,
            },
            {
              title: "Sales return",
              path: "dashboard/sales-return",
              icon: salesReturnIcon,
            },
            {
              title: "Quotation",
              path: "dashboard/quotation",
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
              path: "dashboard/promo",
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
              path: "dashboard/purchases",
              icon: purchaseIcon,
            },
            {
              title: "Purchase order",
              path: "dashboard/purchase-order",
              icon: purchaseOrder,
            },
            {
              title: "Purchase return",
              path: "dashboard/purchase-return",
              icon: purchaseReturnIcon,
            },
          ],
        }
      );
      break;

    case USER_ROLE.FINANCE:
      menus.push({
        section: "Finance & account",
        items: [
          {
            title: "Expanses",
            path: "/expanses",
            icon: "expanses",
          },
        ],
      });
      break;

    default:
      break;
  }
  return [...menus];
};

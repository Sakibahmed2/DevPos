import { USER_ROLE } from "../constants/role";

// icons
import productIcon from "../assets/dashboard icons/admin/inventory/products.svg";
import createProductIcon from "../assets/dashboard icons/admin/inventory/create-product.svg";
import expiredProduct from "../assets/dashboard icons/admin/inventory/expired-products.svg";
import lowStocks from "../assets/dashboard icons/admin/inventory/low-stocks.svg";
import categories from "../assets/dashboard icons/admin/inventory/categories.svg";
import subCategory from "../assets/dashboard icons/admin/inventory/sub-category.svg";

export const sidebarItems = (role) => {
  const menus = [];

  switch (role) {
    case USER_ROLE.SUPER_ADMIN:
      menus.push({
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
        ],
      });
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

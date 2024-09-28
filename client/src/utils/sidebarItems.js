import { USER_ROLE } from "../constants/role";

// icons
import productIcon from "../assets/dashboard icons/admin/inventory/products.svg";
import createProductIcon from "../assets/dashboard icons/admin/inventory/create-product.svg";

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

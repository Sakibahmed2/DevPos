import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

const ItemsLink = ({ title, path, icon: IconComponent }) => {
  const { pathname } = useLocation();

  return (
    <NavLink to={path}>
      <ListItem
        disablePadding
        sx={{
          ...(pathname === path
            ? {
                borderRight: "5px solid #1B9C85",
                bgcolor: "#F4F7FE",
                "& button": {
                  color: "#1B9C85",
                },
              }
            : {}),
          mb: 1,
          p: 0,
        }}
      >
        <ListItemButton>
          <ListItemIcon>{IconComponent && <IconComponent />}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
      </ListItem>
    </NavLink>
  );
};

export default ItemsLink;

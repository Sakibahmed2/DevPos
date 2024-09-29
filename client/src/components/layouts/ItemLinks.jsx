/* eslint-disable react/prop-types */
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

const ItemsLink = ({ title, path, icon }) => {
  const { pathname } = useLocation();

  return (
    <NavLink to={path}>
      <ListItem
        disablePadding
        sx={{
          ...(pathname === `/${path}`
            ? {
                bgcolor: "rgba(0, 176, 117, 0.09)",
                color: "primary.main",
                borderRadius: 2,
                fontWeight: "700",
              }
            : {}),
        }}
      >
        <ListItemButton>
          <ListItemIcon sx={{ color: "#9C9C9C" }}>
            <img
              src={icon}
              alt="icon"
              style={{
                width: "24px",
                height: "24px",
                filter:
                  pathname === `/${path}`
                    ? "brightness(0) saturate(100%) invert(48%) sepia(73%) saturate(328%) hue-rotate(115deg) brightness(93%) contrast(94%)"
                    : "none",
                transition: "filter 0.3s",
              }}
            />
          </ListItemIcon>
          <Typography
            sx={{
              ...(pathname === `/${path}`
                ? {
                    fontWeight: "700",
                  }
                : {}),
            }}
          >
            {title}
          </Typography>
        </ListItemButton>
      </ListItem>
    </NavLink>
  );
};

export default ItemsLink;

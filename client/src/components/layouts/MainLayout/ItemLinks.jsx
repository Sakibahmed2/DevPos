/* eslint-disable react/prop-types */
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  Collapse,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChildItemLinks from "./ChildItemLinks";

const ItemsLink = ({ item }) => {
  const { path, title, icon, children } = item || {};

  const { pathname } = useLocation();

  const childPath = children?.map((child) => child.path);

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box component={NavLink} to={path}>
        <ListItem
          disablePadding
          sx={{
            ...(pathname === `/${path}` ||
            childPath?.find((p) => `/${p}` === pathname)
              ? {
                  bgcolor: "rgba(0, 176, 117, 0.09)",
                  color: "primary.main",
                  borderRadius: 2,
                  fontWeight: "700",
                }
              : {}),
          }}
        >
          <ListItemButton onClick={children ? handleToggle : null}>
            <ListItemIcon sx={{ color: "#9C9C9C" }}>
              <img
                src={icon}
                alt="icon"
                style={{
                  width: "24px",
                  height: "24px",
                  filter:
                    pathname === `/${path}` ||
                    childPath?.find((p) => `/${p}` === pathname)
                      ? "brightness(0) saturate(100%) invert(48%) sepia(73%) saturate(328%) hue-rotate(115deg) brightness(93%) contrast(94%)"
                      : "none",
                  transition: "filter 0.3s",
                }}
              />
            </ListItemIcon>
            <Typography>{title}</Typography>
            {children && (open ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>
      </Box>

      {children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ pl: 4 }}>
            {children.map((child, idx) => (
              <ChildItemLinks key={idx} child={child} />
            ))}
          </Box>
        </Collapse>
      )}
    </>
  );
};

export default ItemsLink;

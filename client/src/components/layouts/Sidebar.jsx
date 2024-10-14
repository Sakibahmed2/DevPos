import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

// icons
import dashboardHome from "../../assets/dashboard icons/dashboard-home-icon.svg";
import devPosLogo from "../../assets/devPosLogo.png";
import { sidebarItems } from "../../utils/sidebarItems";
import ItemsLink from "./ItemLinks";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={1}
        py={2}
        mt={1}
        component={NavLink}
        to={"/"}
        sx={{
          mb: 2,
        }}
      >
        <Typography
          variant="h4"
          component={"h1"}
          sx={{
            fontWeight: "700",
          }}
        >
          <img src={devPosLogo} alt="company logo" className="w-56" />
        </Typography>
      </Stack>

      <List>
        <NavLink to={`/`}>
          <ListItem
            disablePadding
            sx={{
              ...(pathname === `/`
                ? {
                    bgcolor: "rgba(0, 176, 117, 0.09)",
                    color: "primary.main",
                  }
                : {}),
              mb: 1,
              p: 0,
              borderLeft: "8px solid #00B074",
              borderRadius: "5px 0 0 5px",
            }}
          >
            <ListItemButton>
              <ListItemIcon sx={{ color: "#9C9C9C" }}>
                <img
                  src={dashboardHome}
                  alt="Dashboard"
                  style={{
                    width: "24px",
                    height: "24px",
                    filter:
                      pathname === `/`
                        ? "brightness(0) saturate(100%) invert(48%) sepia(73%) saturate(328%) hue-rotate(115deg) brightness(93%) contrast(94%)"
                        : "none",
                    transition: "filter 0.3s",
                  }}
                />
              </ListItemIcon>
              <Typography>Dashboard</Typography>
            </ListItemButton>
          </ListItem>
        </NavLink>
      </List>

      <Divider />
      <List>
        {sidebarItems("finance").map((item, index) => (
          <Box
            key={index}
            sx={{
              mx: 2,
              cursor: "pointer",
            }}
          >
            <Typography
              sx={{ fontWeight: "500", color: "#888888", marginTop: 2, mb: 1 }}
            >
              {item.section}
            </Typography>
            <Stack direction={"column"} gap={1.5}>
              {item.items.map((item, idx) => (
                <ItemsLink key={idx} item={item} />
              ))}
            </Stack>
            <Divider sx={{ marginY: 3 }} />
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;

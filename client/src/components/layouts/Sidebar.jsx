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
      >
        <Typography
          variant="h4"
          component={"h1"}
          sx={{
            fontWeight: "700",
          }}
        >
          <img src={devPosLogo} alt="company logo" className="w-40" />
        </Typography>
      </Stack>

      <List>
        <NavLink to={`/admin/dashboard`}>
          <ListItem
            disablePadding
            sx={{
              ...(pathname === `/admin/dashboard`
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
                      pathname === `/admin/dashboard`
                        ? "brightness(0) saturate(100%) invert(48%) sepia(73%) saturate(328%) hue-rotate(115deg) brightness(93%) contrast(94%)"
                        : "none",
                    transition: "filter 0.3s",
                  }}
                />
              </ListItemIcon>
              <Typography
                sx={{
                  ...(pathname === `/admin/dashboard`
                    ? {
                        fontWeight: "700",
                      }
                    : {}),
                }}
              >
                Dashboard
              </Typography>
            </ListItemButton>
          </ListItem>
        </NavLink>
      </List>

      <Divider />
      <List>
        {sidebarItems("admin").map((item, index) => (
          <Box
            key={index}
            sx={{
              mx: 2,
              cursor: "pointer",
            }}
          >
            <Typography
              sx={{ fontWeight: "bold", color: "#888888", marginTop: 2, mb: 1 }}
            >
              {item.section}
            </Typography>
            {item.items.map((item, idx) => (
              <ItemsLink
                key={idx}
                icon={item.icon}
                path={item.path}
                title={item.title}
              />
            ))}
            <Divider sx={{ marginY: 1 }} />
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;

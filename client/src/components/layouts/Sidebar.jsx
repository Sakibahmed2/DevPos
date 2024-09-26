import { Box, Divider, List, Stack, Typography } from "@mui/material";
import ItemsLink from "./ItemLinks";

// icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListIcon from "@mui/icons-material/List";
import InventoryIcon from "@mui/icons-material/Inventory";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box>
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
        <Typography variant="h5" component={"h1"}>
          <Box component="span" color="primary.main">
            {" "}
            Fabric{" "}
          </Box>{" "}
          Finesse
        </Typography>
      </Stack>
      <Divider />
      <List>
        <>
          <ItemsLink path="/dashboard" title="Dashboard" icon={DashboardIcon} />
          <ItemsLink
            path="/dashboard/products"
            title="All products"
            icon={ListIcon}
          />
          <ItemsLink
            path="/dashboard/orders"
            title="Orders"
            icon={InventoryIcon}
          />
        </>
      </List>
    </Box>
  );
};

export default Sidebar;

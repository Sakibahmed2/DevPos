import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ handleDrawerToggle, drawerWidth }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: "#F4F7FE",
        boxShadow: 0,
        borderBottom: "1px solid lightgray",
      }}
    >
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box>
            <Typography component={"p"}>Welcome to,</Typography>
            <Typography fontSize={20} component={"h1"} fontWeight={600}>
              Fabric finesse
            </Typography>
          </Box>
          <Stack direction={"row"} gap={3}>
            <Badge badgeContent={1} color="primary">
              <IconButton sx={{ background: "#fffff" }}>
                <NotificationsIcon color="action" />
              </IconButton>
            </Badge>
            <Avatar
              src={
                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fHVzZXJ8ZW58MHx8MHx8fDA%3D"
              }
            />
            Account menu
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

/* eslint-disable react/prop-types */
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

// icons
import bellIcon from "../../../assets/dashboard icons/bell.svg";
import messageIcon from "../../../assets/dashboard icons/message.svg";
import settingIcon from "../../../assets/dashboard icons/red-setting.svg";
import { getUserInfo } from "../../../utils/getUserInfo";
import DPClock from "../../ui/DPClock";

const Navbar = ({ handleDrawerToggle, drawerWidth }) => {
  const userInfo = getUserInfo();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: "white",
        boxShadow: 0,
        py: 3,
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
        <Container>
          <Stack
            direction={{
              xs: "column",
              lg: "row",
            }}
            gap={2}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack
              direction={"row"}
              gap={2}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{
                width: {
                  xs: "100%",
                  lg: "70%",
                },
              }}
            >
              <Box>
                <Typography variant="p">Hi, {userInfo.name}</Typography>
                <Typography
                  component={"h1"}
                  variant={"h5"}
                  sx={{
                    fontWeight: 600,
                    color: "primary.main",
                  }}
                >
                  Welcome to DevPos
                </Typography>
              </Box>

              <Box>
                <DPClock />
              </Box>
            </Stack>

            {/* message and user info */}
            <Stack
              direction={"row"}
              gap={2}
              justifyContent={"center"}
              sx={{
                width: {
                  xs: "100%",
                  lg: "30%",
                },
              }}
            >
              <Stack direction={"row"}>
                <IconButton>
                  <Badge color="info" badgeContent={"21"}>
                    <img
                      src={bellIcon}
                      alt="bell"
                      className="p-2 bg-sky-500/20 rounded-2xl"
                    />
                  </Badge>
                </IconButton>

                <IconButton>
                  <Badge color="info" badgeContent={"53"}>
                    <img
                      src={messageIcon}
                      alt="message"
                      className="p-2 bg-sky-500/20 rounded-2xl"
                    />
                  </Badge>
                </IconButton>

                <IconButton>
                  <Badge color="error" badgeContent={"19"}>
                    <img
                      src={settingIcon}
                      alt="setting"
                      className="p-2 bg-red-500/10 rounded-2xl"
                    />
                  </Badge>
                </IconButton>
              </Stack>

              <Box
                sx={{
                  borderLeft: "2px solid gray",
                  pl: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography component={"p"} color="text.secondary">
                  Hello, Sir
                </Typography>
                <Avatar alt="User img" src="/static/images/avatar/1.jpg" />
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

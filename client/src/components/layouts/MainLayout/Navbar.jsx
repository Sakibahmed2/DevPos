/* eslint-disable react/prop-types */
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

// icons
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logOutIcon from "../../../assets/dashboard icons/finance/settings/logOutRed.svg";
import {
  useGetSingleUsersQuery,
  useUpdateUserMutation,
} from "../../../redux/api/auth/authApi";
import { getUserInfo } from "../../../utils/getUserInfo";
import { removeTokenFromLocalStorage } from "../../../utils/local-storage";
import DPClock from "../../ui/DPClock";
import DPLoading from "../../ui/DPLoading";
import { toast } from "sonner";

const Navbar = ({ handleDrawerToggle, drawerWidth }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const userInfo = getUserInfo();
  const navigate = useNavigate();

  const { data: singleUser, isLoading } = useGetSingleUsersQuery(userInfo.id);
  const [updateUser] = useUpdateUserMutation();

  if (isLoading) return <DPLoading />;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    removeTokenFromLocalStorage();
    handleCloseUserMenu();
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    const toastId = toast.loading("Requesting for delete account...");

    try {
      const res = await updateUser({
        id: userInfo.id,
        data: {
          deleteAccount: true,
          accountDeleteRequestDate: new Date().toISOString(),
        },
      }).unwrap();

      if (res?.success) {
        toast.success("Request for deleted account successfully", {
          id: toastId,
        });
        handleLogout();
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete account", { id: toastId });
    }
  };

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
                  lg: "80%",
                },
              }}
            >
              <Box>
                <Typography variant="p">
                  Hi, {singleUser?.data?.firstName || singleUser?.data?.name}
                </Typography>
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
              justifyContent={"end"}
              sx={{
                width: {
                  xs: "100%",
                  lg: "20%",
                },
              }}
            >
              {/* <Stack direction={"row"}>
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
              </Stack> */}

              <Box
                sx={{
                  borderLeft: "2px solid gray",
                  pl: 2,
                  display: "flex",
                  justifyContent: {
                    xs: "center",
                    xl: "end",
                  },
                  alignItems: "center",
                  gap: 2,
                  width: "180px",
                }}
              >
                <Typography component={"p"} color="text.secondary">
                  Hello, {singleUser?.data?.name}
                </Typography>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        src={singleUser?.data?.img && singleUser?.data?.img}
                        alt={singleUser?.data?.name}
                        imgProps={{
                          loading: "eager",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={() => handleDeleteAccount()}>
                      <Stack direction={"row"} gap={1} alignItems={"center"}>
                        <Typography sx={{ textAlign: "center" }}>
                          Delete account
                        </Typography>
                      </Stack>
                    </MenuItem>

                    <MenuItem onClick={handleLogout} sx={{ mt: 1 }}>
                      <Stack direction={"row"} gap={2}>
                        <Typography sx={{ textAlign: "center", color: "red" }}>
                          Logout
                        </Typography>
                        <img src={logOutIcon} alt="" className=" rounded-md " />
                      </Stack>
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

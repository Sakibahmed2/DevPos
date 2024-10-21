/* eslint-disable react/prop-types */
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";

// icons
import searchIcon from "../../../assets/dashboard icons/search.svg";
import settingIcon from "../../../assets/dashboard icons/red-setting.svg";
import bellIcon from "../../../assets/dashboard icons/bell.svg";
import messageIcon from "../../../assets/dashboard icons/message.svg";

const Navbar = ({ handleDrawerToggle, drawerWidth }) => {
  const [store, setStore] = useState("");
  const handleChange = (e) => {
    setStore(e.target.value);
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
            {/* search and sort */}
            <Stack direction={"row"} gap={2}>
              <Box
                sx={{
                  width: "600px",
                }}
              >
                <TextField
                  label="Search here"
                  fullWidth
                  slotProps={{
                    input: {
                      endAdornment: <img src={searchIcon} />,
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  width: {
                    xs: "100%",
                    lg: "170px",
                  },
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select store
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={store}
                    label="Select store"
                    onChange={handleChange}
                  >
                    <MenuItem value={"store"}>Store</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>

            {/* message and user info */}
            <Stack direction={"row"} gap={2}>
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

/* eslint-disable react/prop-types */

import { Box, Stack, Typography } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

const ChildItemLinks = ({ child }) => {
  const { path, title } = child || {};

  const { pathname } = useLocation();

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      sx={{
        ml: 2,
        ...(pathname === `/${path}`
          ? {
              color: "primary.main",
              borderRadius: 2,
              fontWeight: "700",
            }
          : {}),
      }}
      component={NavLink}
      to={`/${path}`}
    >
      <Box
        sx={{
          width: 10,
          height: 10,
          border: "2px solid gray",
          ...(pathname === `/${path}`
            ? {
                border: "2px solid #00B074",
              }
            : {}),
          borderRadius: "50%",
        }}
      ></Box>
      <Typography variant="body2" sx={{ pl: 2, py: 1, fontWeight: 500 }}>
        {title}
      </Typography>
    </Stack>
  );
};

export default ChildItemLinks;

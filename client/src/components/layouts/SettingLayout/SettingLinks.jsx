/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box, Typography } from "@mui/material";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const SettingLinks = ({ path, label }) => {
  const { pathname } = useLocation();

  return (
    <Box
      component={NavLink}
      to={path}
      sx={{
        ...(pathname === path ? { bgcolor: "#00B07426" } : ""),
        px: 8,
        py: 1,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" component={"p"} fontWeight={500}>
        {label}
      </Typography>
    </Box>
  );
};

export default SettingLinks;

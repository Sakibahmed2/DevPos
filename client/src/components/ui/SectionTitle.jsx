/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";

const SectionTitle = ({ title, description }) => {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ fontWeight: "600" }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
        {description}
      </Typography>
    </Box>
  );
};

export default SectionTitle;

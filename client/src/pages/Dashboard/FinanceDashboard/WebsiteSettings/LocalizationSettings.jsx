import { Box, Typography } from "@mui/material";
import employeeIcon from "../../../../assets/dashboard icons/finance/settings/employeeIcon.svg";

const LocalizationSettings = () => {
  return (
    <Box>
      {" "}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mt: 2,
        }}
      >
        <img src={employeeIcon} alt="" />
        <Typography variant="h6" fontWeight={500}>
          Basic information
        </Typography>
      </Box>
    </Box>
  );
};

export default LocalizationSettings;

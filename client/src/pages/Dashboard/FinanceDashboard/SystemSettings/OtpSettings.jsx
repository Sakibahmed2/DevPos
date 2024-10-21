import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import employeeIcon from "../../../../assets/dashboard icons/finance/settings/employeeIcon.svg";

const OtpSettings = () => {
  const [otpType, setOtpType] = useState("");

  return (
    <Box>
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
          OTP setting
        </Typography>
      </Box>

      <Stack direction={"column"} gap={4} mt={4}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>
            <Typography variant="h6" fontWeight={500}>
              OTP type
            </Typography>
            <Typography variant="subtitle1">
              Your can configure the type
            </Typography>
          </Box>

          <FormControl
            sx={{
              width: "212px",
            }}
          >
            <InputLabel id="demo-simple-select-label">OTP</InputLabel>
            <Select
              value={otpType}
              label="OTP"
              onChange={(e) => setOtpType(e.target.value)}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </Box>
  );
};

export default OtpSettings;

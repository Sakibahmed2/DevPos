import { Box, Stack, Switch, Typography } from "@mui/material";
import employeeIcon from "../../../../assets/dashboard icons/finance/settings/employeeIcon.svg";

const NotificationSetting = () => {
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
          Notification
        </Typography>
      </Box>

      <Stack
        direction={"column"}
        gap={2}
        sx={{
          mt: 4,
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6" fontWeight={500}>
            Mobile push notifications
          </Typography>
          <Switch defaultChecked />
        </Stack>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6" fontWeight={500}>
            Desktop notifications
          </Typography>
          <Switch defaultChecked />
        </Stack>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6" fontWeight={500}>
            Email notifications
          </Typography>
          <Switch defaultChecked />
        </Stack>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6" fontWeight={500}>
            SMS notifications
          </Typography>
          <Switch defaultChecked />
        </Stack>
      </Stack>
    </Box>
  );
};

export default NotificationSetting;

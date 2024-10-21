import { Box, Grid2, Typography } from "@mui/material";
import employeeIcon from "../../../../assets/dashboard icons/finance/settings/employeeIcon.svg";
import { Google } from "@mui/icons-material";
import SystemSettingCard from "../../../../components/dashboard/finance/WebsiteSettings/SystemSettingCard";

const systemSettingsInfo = [
  {
    title: "Google Captcha",
    description: "Captcha helps protect you from spam and password decryption",
    icon: <Google />,
  },
  {
    title: "Google Analytics",
    description:
      "Provides statistics and basic analytical tools for SEO and marketing purposes.",
    icon: <Google />,
  },
  {
    title: "Google Adsense Code",
    description:
      "Provides statistics and basic analytical tools for SEO and marketing purposes.",
    icon: <Google />,
  },
  {
    title: "Google Map",
    description: "Captcha helps protect you from spam and password decryption",
    icon: <Google />,
  },
];

const WebsiteSettings = () => {
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
          System settings
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 3,
        }}
      >
        <Grid2 container spacing={3}>
          {systemSettingsInfo.map((setting, index) => (
            <Grid2 item size={4} key={index}>
              <SystemSettingCard item={setting} />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
};

export default WebsiteSettings;

import { Box, Grid2, Typography } from "@mui/material";
import employeeIcon from "../../../../assets/dashboard icons/finance/settings/employeeIcon.svg";
import SystemSettingCard from "../../../../components/dashboard/finance/WebsiteSettings/SystemSettingCard";

const systemSettingsInfo = [
  {
    id: 1,
    title: "PHP Mailer",
    description: "Captcha helps protect you from spam and password decryption",
  },
  {
    id: 2,
    title: "SMTP",
    description:
      "Provides statistics and basic analytical tools for SEO and marketing purposes.",
  },
];

const SystemSettings = () => {
  return (
    <div>
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
          Email setting
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
    </div>
  );
};

export default SystemSettings;

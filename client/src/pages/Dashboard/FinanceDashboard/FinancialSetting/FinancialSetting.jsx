import { Box, Grid2, Typography } from "@mui/material";
import employeeIcon from "../../../../assets/dashboard icons/finance/settings/employeeIcon.svg";
import paypal from "../../../../assets/paypal.svg";
import PaymentGatewayCard from "../../../../components/dashboard/finance/FinancialSetting/PaymentGatewayCard";

const systemSettingsInfo = [
  {
    description:
      "PayPal is the faster, safer way to send and receive money or make an online payment.",
    icon: paypal,
  },
  {
    description:
      "PayPal is the faster, safer way to send and receive money or make an online payment.",
    icon: paypal,
  },
  {
    description:
      "PayPal is the faster, safer way to send and receive money or make an online payment.",
    icon: paypal,
  },
  {
    description:
      "PayPal is the faster, safer way to send and receive money or make an online payment.",
    icon: paypal,
  },
];

const FinancialSetting = () => {
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
          Gateway settings
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
              <PaymentGatewayCard item={setting} />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
};

export default FinancialSetting;

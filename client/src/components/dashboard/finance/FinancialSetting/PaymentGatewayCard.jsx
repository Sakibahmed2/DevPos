/* eslint-disable react/prop-types */
import {
  Box,
  Card,
  CardContent,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

const PaymentGatewayCard = ({ item }) => {
  const { description, icon } = item || {};

  return (
    <Card
      sx={{
        bgcolor: "#F4F4F4",
        height: "250px",
        borderRadius: 5,
        padding: "10px 20px",
        boxShadow: 0,
      }}
    >
      <CardContent>
        <Box spacing={2}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={2}
            sx={{
              mb: 2,
            }}
          >
            <Box>
              <img src={icon} alt="" />
            </Box>
            <Switch defaultChecked />
          </Stack>
          <Box>
            <Typography variant="subtitle1" color="textSecondary">
              {description}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PaymentGatewayCard;

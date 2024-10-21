/* eslint-disable react/prop-types */
import {
  Box,
  Card,
  CardContent,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

const SystemSettingCard = ({ item }) => {
  const { title, description, icon } = item || {};

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
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={2}
              sx={{
                mb: 4,
              }}
            >
              <Box>{icon}</Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontSize: "25px",
                  color: "#7A7373",
                }}
              >
                {title}
              </Typography>
            </Stack>

            <Switch defaultChecked />
          </Stack>
          <Box item>
            <Typography variant="subtitle1" color="textSecondary">
              {description}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SystemSettingCard;

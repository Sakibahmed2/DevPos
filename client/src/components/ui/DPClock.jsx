import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const DPClock = () => {
  const [time, setTime] = useState({
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    period: new Date().getHours() >= 12 ? "PM" : "AM",
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const period = hour >= 12 ? "PM" : "AM";

      setTime({
        hour: hour % 12 === 0 ? 12 : hour % 12, // Convert to 12-hour format
        minute,
        period,
      });
    };

    const intervalId = setInterval(tick, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Box display="flex" alignItems="center" gap={1}>
        <Box
          sx={{
            backgroundColor: "#e0f2ff",
            padding: "5px 20px",
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            {time.hour}
          </Typography>
        </Box>
        <Typography variant="h5" fontWeight="bold">
          :
        </Typography>
        <Box
          sx={{
            backgroundColor: "#ffe0e0",
            padding: "5px 20px",
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            {time.minute.toString().padStart(2, "0")}
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        gap={1}
        sx={{
          border: "1px solid lightgray",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: time.period === "AM" ? "#e0f2ff" : "transparent",
            color: time.period === "AM" ? "black" : "gray",
            padding: "5px 15px",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">AM</Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: time.period === "PM" ? "#e0f2ff" : "transparent",
            color: time.period === "PM" ? "black" : "gray",
            padding: "5px 15px",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">PM</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DPClock;

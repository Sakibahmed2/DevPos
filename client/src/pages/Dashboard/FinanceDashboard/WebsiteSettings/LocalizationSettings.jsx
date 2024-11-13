import { Box, Stack, Typography } from "@mui/material";
import employeeIcon from "../../../../assets/dashboard icons/finance/settings/employeeIcon.svg";
import DPForm from "../../../../components/form/DPForm";
import DPSelect from "../../../../components/form/DPSelect";

const defaultValue = {};

const LocalizationSettings = () => {
  const onSubmit = (data) => {
    console.log(data);
  };

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
      <DPForm onSubmit={onSubmit} defaultValue={defaultValue}>
        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Typography variant="h6" fontWeight={500}>
                Language
              </Typography>
              <Typography variant="subtitle1">
                Select Language of the Website
              </Typography>
            </Box>
            <Box
              sx={{
                width: "200px",
              }}
            >
              <DPSelect
                name={"language"}
                label={"Language"}
                items={["English", "Bangla", "Urdu", "Arabic"]}
              />
            </Box>
          </Stack>

          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Typography variant="h6" fontWeight={500}>
                Timezone
              </Typography>
              <Typography variant="subtitle1">
                Select Time zone in website
              </Typography>
            </Box>
            <Box
              sx={{
                width: "200px",
              }}
            >
              <DPSelect
                name={"timezone"}
                label={"Timezone"}
                items={["GMT+6", "GMT+7", "GMT+8"]}
              />
            </Box>
          </Stack>

          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Typography variant="h6" fontWeight={500}>
                Date formate
              </Typography>
              <Typography variant="subtitle1">
                Select date format to display in website
              </Typography>
            </Box>
            <Box
              sx={{
                width: "200px",
              }}
            >
              <DPSelect
                name={"language"}
                label={"Language"}
                items={["DD/MM/YYYY", "MM/DD/YYYY", "YYYY/MM/DD", "DD-MM-YYYY"]}
              />
            </Box>
          </Stack>

          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Typography variant="h6" fontWeight={500}>
                Time formate
              </Typography>
              <Typography variant="subtitle1">
                Select time format to display in website
              </Typography>
            </Box>
            <Box
              sx={{
                width: "200px",
              }}
            >
              <DPSelect
                name={"language"}
                label={"Language"}
                items={[
                  "12 Hours (AM/PM)",
                  "24 Hours (00:00)",
                  "24 Hours (00:00:00)",
                ]}
              />
            </Box>
          </Stack>

          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Typography variant="h6" fontWeight={500}>
                Financial year
              </Typography>
              <Typography variant="subtitle1">
                Select year for finance
              </Typography>
            </Box>
            <Box
              sx={{
                width: "200px",
              }}
            >
              <DPSelect
                name={"language"}
                label={"Language"}
                items={[
                  "January - December",
                  "April - March",
                  "July - June",
                  "October - September",
                ]}
              />
            </Box>
          </Stack>

          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Typography variant="h6" fontWeight={500}>
                Starting month
              </Typography>
              <Typography variant="subtitle1">
                Select starting month to display
              </Typography>
            </Box>
            <Box
              sx={{
                width: "200px",
              }}
            >
              <DPSelect
                name={"language"}
                label={"Language"}
                items={[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ]}
              />
            </Box>
          </Stack>
        </Box>
      </DPForm>
    </Box>
  );
};

export default LocalizationSettings;

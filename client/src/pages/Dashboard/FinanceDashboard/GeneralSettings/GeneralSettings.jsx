import {
  Box,
  Button,
  Container,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import employeeIcon from "../../../../assets/dashboard icons/finance/settings/employeeIcon.svg";
import DPFileUploader from "../../../../components/form/DPFileUploader";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";

const defaultValue = {
  profileImg: "",
  firstName: "",
  lastName: "",
  username: "",
  phone: "",
  email: "",
  country: "",
  state: "",
  city: "",
  postalCode: "",
};

const GeneralSettings = () => {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container>
      {/* Employee setting */}
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
            Employee information
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 2,
          }}
        >
          <DPForm onSubmit={onSubmit} defaultValue={defaultValue}>
            <Stack direction={"column"} gap={3}>
              <DPFileUploader name={"profileImg"} label={"Profile photo"} />

              <Stack direction={"row"} gap={2}>
                <DPInput name={"firstName"} label={"First name"} />
                <DPInput name={"lastName"} label={"Last name"} />
                <DPInput name={"username"} label={"Username"} />
              </Stack>

              <Grid2 container spacing={2}>
                <Grid2 item size={4}>
                  <DPInput name={"phone"} label={"Phone number"} />
                </Grid2>
                <Grid2 item size={4}>
                  <DPInput name={"email"} label={"Email"} />
                </Grid2>
              </Grid2>

              <Typography variant="h6" fontWeight={500} sx={{ mt: 2 }}>
                Your address
              </Typography>

              <Stack direction={"row"} gap={2}>
                <DPInput name={"country"} label={"Country"} />
                <DPInput name={"state"} label={"State"} />
                <DPInput name={"city"} label={"City"} />
              </Stack>

              <Grid2 container spacing={2}>
                <Grid2 item size={4}>
                  <DPInput name={"postalCode"} label={"Postal code"} />
                </Grid2>
              </Grid2>
            </Stack>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: 5,
              }}
            >
              <Button type="submit">Save</Button>
              <Button
                sx={{
                  backgroundColor: "black",
                }}
              >
                Cancel
              </Button>
            </Box>
          </DPForm>
        </Box>
      </Box>
    </Container>
  );
};

export default GeneralSettings;

import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import employeeIcon from "../../../../assets/dashboard icons/finance/settings/employeeIcon.svg";
import DPForm from "../../../../components/form/DPForm";
import DPSelect from "../../../../components/form/DPSelect";
import DPInput from "../../../../components/form/DPInput";

const defaultValues = {
  companyLogo: "",
};

const GDPRSettings = () => {
  const onSubmit = (data) => {
    console.log(data);
  };

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
          GDPR setting
        </Typography>
      </Box>

      <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
        <Stack direction={"column"} gap={4} mt={4}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h6" fontWeight={500}>
              Cookies Consent Text
            </Typography>

            <DPInput
              name={"cookiesConsentText"}
              label={"Message"}
              multiline
              rows={4}
              sx={{
                width: "512px",
              }}
            />
          </Stack>

          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Typography variant="h6" fontWeight={500}>
                Cookie position
              </Typography>
              <Typography variant="subtitle1">
                Your can configure the type
              </Typography>
            </Box>

            <DPSelect
              name={"prefix"}
              label={"Invoice prefix"}
              items={["Left", "Right"]}
              sx={{ width: "212px" }}
            />
          </Stack>

          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Typography variant="h6" fontWeight={500}>
                Agree button text
              </Typography>
              <Typography variant="subtitle1">
                Your can configure the text here
              </Typography>
            </Box>

            <DPSelect
              name={"prefix"}
              label={"Invoice prefix"}
              items={["Agree", "Accept"]}
              sx={{ width: "212px" }}
            />
          </Stack>

          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Typography variant="h6" fontWeight={500}>
                Show decline button
              </Typography>
              <Typography variant="subtitle1">
                Your can configure the text here
              </Typography>
            </Box>

            <Switch name="showCompanyDetails" />
          </Stack>
        </Stack>

        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
          mt={4}
        >
          <Button type="submit">Save</Button>
          <Button
            sx={{
              backgroundColor: "black",
            }}
          >
            Cancel
          </Button>
        </Stack>
      </DPForm>
    </Box>
  );
};

export default GDPRSettings;

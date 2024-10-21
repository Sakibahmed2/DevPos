import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import employeeIcon from "../../../../assets/dashboard icons/finance/settings/employeeIcon.svg";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import companyImagesIcon from "../../../../assets/dashboard icons/finance/settings/companyImgaesIcon.svg";
import styled from "@emotion/styled";
import uploadImgIcon from "../../../../assets/dashboard icons/finance/settings/uploadImgIcon.svg";
import addressIcon from "../../../../assets/dashboard icons/finance/settings/addressIcon.svg";

const defaultValues = {
  companyName: "",
  companyEmail: "",
  companyPhone: "",
  companyTax: "",
  website: "",
  companyLogo: "",
  companyIcon: "",
  favicon: "",
  country: "",
  state: "",
  city: "",
  postalCode: "",
};

const CompanySettings = () => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const onSubmit = (data) => {
    console.log(data);
  };

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
          Company settings
        </Typography>
      </Box>
      <Box>
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"row"}
            spacing={3}
            sx={{
              my: 2,
            }}
          >
            <DPInput name={"companyName"} label={"Company name"} />
            <DPInput name={"companyEmail"} label={"Company email address"} />
            <DPInput name={"companyPhone"} label={"Company Phone"} />
          </Stack>

          <Grid2 container spacing={3}>
            <Grid2 item size={4}>
              <DPInput name={"companyTax"} label={"Tax"} />
            </Grid2>
            <Grid2 item size={4}>
              <DPInput name={"website"} label={"Website"} />
            </Grid2>
          </Grid2>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mt: 4,
            }}
          >
            <img src={companyImagesIcon} alt="" />
            <Typography variant="h6" fontWeight={500}>
              Company settings
            </Typography>
          </Box>

          <Stack direction={"column"} gap={4} mt={4}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box>
                <Typography variant="h6" fontWeight={500}>
                  Company logo
                </Typography>
                <Typography variant="subtitle1">
                  Upload Logo of your Company to display in website
                </Typography>
              </Box>

              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<img src={uploadImgIcon} alt="" />}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => console.log(event.target.files)}
                  multiple
                  name="companyLogo"
                />
              </Button>
            </Stack>

            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box>
                <Typography variant="h6" fontWeight={500}>
                  Company icon
                </Typography>
                <Typography variant="subtitle1">
                  Upload Icon of your Company to display in website
                </Typography>
              </Box>

              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<img src={uploadImgIcon} alt="" />}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => console.log(event.target.files)}
                  multiple
                  name="companyIcon"
                />
              </Button>
            </Stack>

            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box>
                <Typography variant="h6" fontWeight={500}>
                  Favicon
                </Typography>
                <Typography variant="subtitle1">
                  Upload Icon of your Company to display in website
                </Typography>
              </Box>

              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<img src={uploadImgIcon} alt="" />}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => console.log(event.target.files)}
                  multiple
                  name="favicon"
                />
              </Button>
            </Stack>
          </Stack>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mt: 4,
            }}
          >
            <img src={addressIcon} alt="" />
            <Typography variant="h6" fontWeight={500}>
              Address
            </Typography>
          </Box>

          <Stack direction={"row"} gap={2} mt={2}>
            <DPInput name={"country"} label={"Country"} />
            <DPInput name={"state"} label={"State"} />
            <DPInput name={"city"} label={"City"} />
          </Stack>

          <Grid2 container spacing={2} mt={2}>
            <Grid2 item size={4}>
              <DPInput name={"postalCode"} label={"Postal code"} />
            </Grid2>
          </Grid2>

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
    </div>
  );
};

export default CompanySettings;

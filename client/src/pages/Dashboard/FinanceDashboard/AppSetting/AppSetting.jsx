import styled from "@emotion/styled";
import {
  Box,
  Button,
  Container,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import userIcon from "../../../../assets/dashboard icons/finance/settings/employeeIcon.svg";
import uploadImgIcon from "../../../../assets/dashboard icons/finance/settings/uploadImgIcon.svg";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPSelect from "../../../../components/form/DPSelect";
import SectionTitle from "../../../../components/ui/SectionTitle";

const defaultValues = {
  companyLogo: "",
};

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

const AppSetting = () => {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Box
        sx={{
          borderBottom: "2px solid lightgray",
          pb: 2,
        }}
      >
        <SectionTitle
          title={"Setting"}
          description={"Manage your setting on portal"}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mt: 2,
        }}
      >
        <img src={userIcon} alt="" />
        <Typography variant="h6" fontWeight={500}>
          Invoice setting
        </Typography>
      </Box>

      <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
        <Stack direction={"column"} gap={4} mt={4}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Typography variant="h6" fontWeight={500}>
                Invoice logo
              </Typography>
              <Typography variant="subtitle1">
                Upload Logo of your Company to display in Invoice
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
                Invoice prefix
              </Typography>
              <Typography variant="subtitle1">
                Add prefix to your invoice
              </Typography>
            </Box>

            <DPSelect
              name={"prefix"}
              label={"Invoice prefix"}
              items={["INV-", "INV/"]}
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
                Invoice due
              </Typography>
              <Typography variant="subtitle1">
                Select due date to display in Invoice
              </Typography>
            </Box>

            <DPSelect
              name={"prefix"}
              label={"Invoice prefix"}
              items={[5, 10, 8]}
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
                Show company details
              </Typography>
              <Typography variant="subtitle1">
                Show / Hide Company Details in Invoice
              </Typography>
            </Box>

            <Switch name="showCompanyDetails" />
          </Stack>

          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h6" fontWeight={500}>
              Invoice Header Terms
            </Typography>

            <DPInput
              name={"invoiceHeaderTerms"}
              label={"Terms"}
              multiline
              rows={4}
              sx={{
                width: "512px",
              }}
            />
          </Stack>

          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h6" fontWeight={500}>
              Invoice footer Terms
            </Typography>

            <DPInput
              name={"invoiceFooterTerms"}
              label={"Terms"}
              multiline
              rows={4}
              sx={{
                width: "512px",
              }}
            />
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
    </Container>
  );
};

export default AppSetting;

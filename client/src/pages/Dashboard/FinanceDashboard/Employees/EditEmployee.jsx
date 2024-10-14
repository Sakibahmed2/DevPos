import {
  Box,
  Button,
  Container,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import DPDatePicker from "../../../../components/form/DPDatePicker";
import DPFileUploader from "../../../../components/form/DPFileUploader";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPSelect from "../../../../components/form/DPSelect";
import SectionTitle from "../../../../components/ui/SectionTitle";

const defaultValues = {
  firstName: "",
  lastName: "",
  img: "",
  email: "",
  contactNo: "",
  employeeCode: "",
  dateOfBirth: "",
  gender: "",
  nationality: "",
  joiningDate: "",
  shift: "",
  department: "",
  designation: "",
  bloodGroup: "",
};

const EditEmployee = () => {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <SectionTitle
        title={"Edit employee"}
        description={"Edit employee here"}
      />

      <Box
        sx={{
          border: "1px solid gray",
          p: 2,
          mt: 4,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "black",
            fontWeight: "500",
            borderBottom: "1px solid lightgray",
            padding: "40px 10px",
          }}
        >
          Employee information
        </Typography>

        <DPForm
          onSubmit={onSubmit}
          defaultValue={defaultValues}
          className={"mt-6"}
        >
          <Stack direction={"column"} gap={3}>
            <DPFileUploader name={"img"} label={"Add image"} />

            <Stack direction={"row"} gap={3}>
              <DPInput name={"firstName"} label={"First name"} />
              <DPInput name={"lastName"} label={"Last name"} />
              <DPInput name={"email"} label={"email"} />
            </Stack>

            <Stack direction={"row"} gap={3}>
              <DPInput name={"contactNo"} label={"Contact no"} />
              <DPInput name={"employeeCode"} label={"EMP code"} />
              <DPDatePicker name={"dateOfBirth"} label={"Date of birth"} />
            </Stack>

            <Stack direction={"row"} gap={3}>
              <DPSelect
                name={"gender"}
                label={"Gender"}
                items={["Male", "Female"]}
              />
              <DPSelect
                name={"nationality"}
                label={"Nationality"}
                items={["Bangladesh", "India", "Pakistan"]}
              />
              <DPDatePicker name={"joiningDate"} label={"Joining date"} />
            </Stack>

            <Stack direction={"row"} gap={3}>
              <DPSelect
                name={"shift"}
                label={"Shift"}
                items={["Morning", "Evening", "Night"]}
              />
              <DPSelect
                name={"department"}
                label={"Department"}
                items={["Software", "Admin", "HR"]}
              />

              <DPSelect
                name={"designation"}
                label={"Designation"}
                items={["Developer", "Manager", "Data administrator"]}
              />
            </Stack>

            <Grid2 container gap={3}>
              <Grid2 item size={4}>
                <DPSelect
                  name={"bloodGroup"}
                  label={"Blood group"}
                  items={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                />
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
    </Container>
  );
};

export default EditEmployee;

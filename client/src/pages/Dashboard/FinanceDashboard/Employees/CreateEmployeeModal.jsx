/* eslint-disable react/prop-types */
import { Box, Button, Grid2, Stack, Switch, Typography } from "@mui/material";
import { useState } from "react";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import DPFileUploader from "../../../../components/form/DPFileUploader";
import DPDatePicker from "../../../../components/form/DPDatePicker";
import DPSelect from "../../../../components/form/DPSelect";

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

const CreateEmployeeModal = ({ open, setOpen }) => {
  const [toggleStatus, setToggleStatus] = useState("Active");

  const handleToggle = (event) => {
    setToggleStatus(event.target.checked ? "Active" : "Inactive");
  };

  const onSubmit = (data) => {
    data.status = toggleStatus;
    console.log(data);
  };

  return (
    <Box>
      <DPModal
        open={open}
        setOpen={setOpen}
        title="Add new employee"
        maxWidth="xl"
      >
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "900px",
            }}
          >
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

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography component={"p"}>Status</Typography>
              <Switch
                checked={toggleStatus === "Active"}
                onChange={handleToggle}
                size="medium"
              />
            </Box>
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
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </DPForm>
      </DPModal>
    </Box>
  );
};

export default CreateEmployeeModal;

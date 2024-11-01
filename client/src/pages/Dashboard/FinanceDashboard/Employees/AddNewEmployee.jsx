import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { toast } from "sonner";
import DPDatePicker from "../../../../components/form/DPDatePicker";
import DPFileUploader from "../../../../components/form/DPFileUploader";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPSelect from "../../../../components/form/DPSelect";
import DPLoading from "../../../../components/ui/DPLoading";
import SectionTitle from "../../../../components/ui/SectionTitle";
import { useGetAllDepartmentsQuery } from "../../../../redux/api/finance/departmentsApi";
import { useGetAllDesignationsQuery } from "../../../../redux/api/finance/designationsApi";
import { useCreateEmployeesMutation } from "../../../../redux/api/finance/employeesApi";
import { useGetAllShiftsQuery } from "../../../../redux/api/finance/shiftsApi";
import { convertDataForSelect } from "../../../../utils/convertDataForSelect";
import convertImgToBase64 from "../../../../utils/convertImgToBase64";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  firstName: "",
  lastName: "",
  img: "",
  email: "",
  contactNo: "",
  dateOfBirth: "",
  gender: "",
  joiningDate: "",
  shift: "",
  department: "",
  designation: "",
  bloodGroup: "",
};

const AddNewEmployee = () => {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const navigate = useNavigate();

  const { data: shiftData, isLoading: shiftLoading } = useGetAllShiftsQuery({});
  const { data: departmentData, isLoading: departmentLoading } =
    useGetAllDepartmentsQuery({});
  const { data: designationData, isLoading: designationLoading } =
    useGetAllDesignationsQuery({});
  const [createEmployees] = useCreateEmployeesMutation();

  if (shiftLoading || departmentLoading || designationLoading) {
    return <DPLoading />;
  }

  const shiftDataForSelect = convertDataForSelect(shiftData?.data?.result);
  const departmentDataForSelect = convertDataForSelect(
    departmentData?.data?.result
  );
  const designationDataForSelect = convertDataForSelect(
    designationData?.data?.result
  );

  const onSubmit = async (data) => {
    const toastId = toast.loading("Adding new employee...");
    const base64img = await convertImgToBase64(data.img);

    try {
      const employeeData = {
        firstName: data.firstName,
        lastName: data.lastName,
        img: base64img,
        email: data.email,
        contactNo: data.contactNo,
        dateOfBirth: data.date,
        joiningDate: data.joiningDate,
        gender: data.gender,
        shift: data.shift,
        department: data.department,
        designation: data.designation,
        bloodGroup: data.bloodGroup,
        nationality: value.label,
      };

      const res = await createEmployees(employeeData).unwrap();
      if (res.success) {
        toast.success("New employee added successfully", { id: toastId });
        navigate("/finance/employees");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to add new employee", { id: toastId });
    }
  };

  return (
    <Container>
      <SectionTitle
        title={"Add new employee"}
        description={"Add new employee here"}
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
              <DPDatePicker name={"dateOfBirth"} label={"Date of birth"} />
              <DPSelect
                name={"gender"}
                label={"Gender"}
                items={["Male", "Female", "Other"]}
              />
            </Stack>

            <Stack direction={"row"} gap={3}>
              <Box
                sx={{
                  width: "100%",
                  overflow: "hidden 0",
                  zIndex: 99,
                }}
              >
                <Select
                  options={options}
                  value={value}
                  onChange={(e) => setValue(e)}
                  styles={{
                    control: (base) => ({
                      ...base,
                      padding: "9px 0",
                      borderRadius: "8px",
                    }),
                  }}
                />
              </Box>
              <DPDatePicker name={"joiningDate"} label={"Joining date"} />
              <DPSelect
                name={"shift"}
                label={"Shift"}
                items={shiftDataForSelect}
              />
            </Stack>

            <Stack direction={"row"} gap={3}>
              <DPSelect
                name={"department"}
                label={"Department"}
                items={departmentDataForSelect}
              />

              <DPSelect
                name={"designation"}
                label={"Designation"}
                items={designationDataForSelect}
              />
              <DPSelect
                name={"bloodGroup"}
                label={"Blood group"}
                items={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
              />
            </Stack>
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

export default AddNewEmployee;

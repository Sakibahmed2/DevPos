import {
  Box,
  Button,
  Container,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import countryList from "react-select-country-list";
import DPDatePicker from "../../../../components/form/DPDatePicker";
import DPFileUploader from "../../../../components/form/DPFileUploader";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPSelect from "../../../../components/form/DPSelect";
import DPLoading from "../../../../components/ui/DPLoading";
import SectionTitle from "../../../../components/ui/SectionTitle";
import { useGetAllDepartmentsQuery } from "../../../../redux/api/finance/departmentsApi";
import { useGetAllDesignationsQuery } from "../../../../redux/api/finance/designationsApi";
import {
  useGetSingleEmployeesQuery,
  useUpdateEmployeesMutation,
} from "../../../../redux/api/finance/employeesApi";
import { useGetAllShiftsQuery } from "../../../../redux/api/finance/shiftsApi";
import { convertDataForSelect } from "../../../../utils/convertDataForSelect";
import { toast } from "sonner";
import convertImgToBase64 from "../../../../utils/convertImgToBase64";

const EditEmployee = () => {
  const [status, setStatus] = useState("Active");
  const params = useParams();
  const { id } = params;
  const { data: singleEmployee, isLoading: singleEmployeeLoading } =
    useGetSingleEmployeesQuery(id);
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const { data: shiftData, isLoading: shiftLoading } = useGetAllShiftsQuery({});
  const { data: departmentData, isLoading: departmentLoading } =
    useGetAllDepartmentsQuery({});
  const { data: designationData, isLoading: designationLoading } =
    useGetAllDesignationsQuery({});
  const navigate = useNavigate();

  const [updateEmployee] = useUpdateEmployeesMutation();

  if (
    shiftLoading ||
    departmentLoading ||
    designationLoading ||
    singleEmployeeLoading
  ) {
    return <DPLoading />;
  }

  const shiftDataForSelect = convertDataForSelect(shiftData?.data?.result);
  const departmentDataForSelect = convertDataForSelect(
    departmentData?.data?.result
  );
  const designationDataForSelect = convertDataForSelect(
    designationData?.data?.result
  );

  const defaultValues = {
    firstName: singleEmployee?.data?.firstName,
    lastName: singleEmployee?.data?.lastName,
    img: singleEmployee?.data?.img,
    email: singleEmployee?.data?.email,
    contactNo: singleEmployee?.data?.contactNo,
    dateOfBirth: singleEmployee?.data?.dateOfBirth,
    gender: singleEmployee?.data?.gender,
    joiningDate: singleEmployee?.data?.joiningDate,
    shift: singleEmployee?.data?.shift?._id,
    department: singleEmployee?.data?.department?._id,
    designation: singleEmployee?.data?.designation?._id,
    bloodGroup: singleEmployee?.data?.bloodGroup,
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating employee...");
    let base64Img = singleEmployee?.data?.img;
    if (data.img instanceof Blob) {
      base64Img = await convertImgToBase64(data.img);
    }

    try {
      const employeeData = {
        firstName: data.firstName,
        lastName: data.lastName,
        img: base64Img,
        email: data.email,
        contactNo: data.contactNo,
        dateOfBirth: data.dateOfBirth,
        joiningDate: data.joiningDate,
        department: data.department,
        designation: data.designation,
        shift: data.shift,
        bloodGroup: data.bloodGroup,
        nationality: value.label
          ? value.label
          : singleEmployee?.data?.nationality,
        status: status,
        gender: data.gender,
      };

      const res = await updateEmployee({ id, data: employeeData }).unwrap();

      if (res?.success) {
        toast.success("Employee updated successfully", { id: toastId });
        navigate("/finance/employees");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update employee", { id: toastId });
    }
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
            <Stack direction={"row"} gap={2}>
              <DPFileUploader name={"img"} label={"Add image"} />
              <img
                src={singleEmployee?.data?.img}
                alt=""
                className="h-[200px] w-[200px]"
              />
            </Stack>

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
                items={["Male", "Female"]}
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

            <Box
              sx={{
                width: "150px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography component={"p"}>Status</Typography>
              <Switch
                checked={status === "Active"}
                size="medium"
                onChange={() =>
                  setStatus((prev) =>
                    prev === "Active" ? "Inactive" : "Active"
                  )
                }
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

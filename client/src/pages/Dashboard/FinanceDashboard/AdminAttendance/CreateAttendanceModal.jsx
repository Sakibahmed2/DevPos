/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPSelect from "../../../../components/form/DPSelect";
import DPTimePicker from "../../../../components/form/DPTimePicker";
import DPModal from "../../../../components/modal/DPModal";
import DPLoading from "../../../../components/ui/DPLoading";
import { useGetAllEmployeesQuery } from "../../../../redux/api/finance/employeesApi";
import { useCreateAttendanceMutation } from "../../../../redux/api/finance/attendanceApi";
import { toast } from "sonner";

const defaultValues = {
  employee: "",
  checkIn: "",
  checkOut: "",
};

const CreateAttendanceModal = ({ open, setOpen }) => {
  const { data: allEmployee, isLoading } = useGetAllEmployeesQuery({});
  const [createAttendance] = useCreateAttendanceMutation();

  if (isLoading) return <DPLoading />;
  const employeeDataForGenerateSelect = allEmployee?.data?.result.map(
    (employee) => ({
      value: employee._id,
      name: `${employee.firstName} ${employee.lastName}`,
    })
  );

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating attendance...");
    try {
      const attendanceData = {
        employee: data.employee,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
      };

      const res = await createAttendance(attendanceData).unwrap();
      if (res?.success) {
        toast.success("Attendance created successfully", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to create attendance", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Add attendance">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <DPSelect
              name={"employee"}
              label={"Employee name"}
              items={employeeDataForGenerateSelect}
            />

            <Stack direction={"row"} gap={3}>
              <DPTimePicker name={"checkIn"} label={"Check in"} />
              <DPTimePicker name={"checkOut"} label={"Check out"} />
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

export default CreateAttendanceModal;

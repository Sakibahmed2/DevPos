/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPSelect from "../../../../components/form/DPSelect";
import DPTimePicker from "../../../../components/form/DPTimePicker";
import DPModal from "../../../../components/modal/DPModal";
import DPLoading from "../../../../components/ui/DPLoading";
import {
  useGetSingleAttendanceQuery,
  useUpdateAttendanceMutation,
} from "../../../../redux/api/finance/attendanceApi";
import { useGetAllEmployeesQuery } from "../../../../redux/api/finance/employeesApi";
import dayjs from "dayjs";
import { toast } from "sonner";

const EditAttendanceModal = ({ open, setOpen, id }) => {
  const { data: singleAttendance } = useGetSingleAttendanceQuery(id);
  const { data: allEmployee, isLoading } = useGetAllEmployeesQuery({});
  const [updateAttendance] = useUpdateAttendanceMutation();

  const employeeDataForGenerateSelect = allEmployee?.data?.result.map(
    (employee) => ({
      value: employee._id,
      name: `${employee.firstName} ${employee.lastName}`,
    })
  );
  if (isLoading) return <DPLoading />;

  const defaultValues = {
    employee: singleAttendance?.data?.employee?._id,
    checkIn: singleAttendance?.data?.checkIn
      ? dayjs(singleAttendance.data.checkIn)
      : null, // Convert checkIn to Day.js
    checkOut: singleAttendance?.data?.checkOut
      ? dayjs(singleAttendance.data.checkOut)
      : null, // Convert checkOut to Day.js
  };

  const onSubmit = async (data) => {
    console.log(data);
    const toastId = toast.loading("Updating attendance...");
    try {
      const attendanceData = {
        employee: data.employee,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
      };

      const res = await updateAttendance({ id, data: attendanceData }).unwrap();
      if (res?.success) {
        toast.success("Attendance updated successfully", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update attendance", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Edit attendance">
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

export default EditAttendanceModal;

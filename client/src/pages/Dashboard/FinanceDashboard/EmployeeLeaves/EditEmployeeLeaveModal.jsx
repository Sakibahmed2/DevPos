/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import DPDatePicker from "../../../../components/form/DPDatePicker";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import {
  useGetSingleLeavesQuery,
  useUpdateLeavesMutation,
} from "../../../../redux/api/finance/leavesApi";
import { useGetAllEmployeesQuery } from "../../../../redux/api/finance/employeesApi";
import { useGetAllLeaveTypesQuery } from "../../../../redux/api/finance/leaveTypesApi";
import { convertDataForSelect } from "../../../../utils/convertDataForSelect";
import DPLoading from "../../../../components/ui/DPLoading";
import DPSelect from "../../../../components/form/DPSelect";
import { toast } from "sonner";

const EditEmployeeLeaveModal = ({ open, setOpen, id }) => {
  const { data: allEmployee, isLoading } = useGetAllEmployeesQuery({});
  const { data: leaveTypes, isLoading: leaveTypesLoading } =
    useGetAllLeaveTypesQuery({});
  const { data: singleLeave, isLoading: singleLeaveLoading } =
    useGetSingleLeavesQuery(id);

  const [updateLeave] = useUpdateLeavesMutation();

  if (isLoading || leaveTypesLoading || singleLeaveLoading)
    return <DPLoading />;

  const employeeDataForGenerateSelect = allEmployee?.data?.result.map(
    (employee) => ({
      value: employee._id,
      name: `${employee.firstName} ${employee.lastName}`,
    })
  );
  const leaveTypeDataForSelect = convertDataForSelect(leaveTypes?.data?.result);

  const defaultValues = {
    employee: singleLeave?.data?.employee?._id,
    leaveType: singleLeave?.data?.leaveType?._id,
    startDate: null,
    endDate: null,
    reason: singleLeave?.data?.reason,
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating leave...");

    try {
      const updatedData = {
        employee: data.employee,
        leaveType: data.leaveType,
        startDate: data.startDate
          ? data.startDate.toISOString()
          : singleLeave?.data?.startDate,
        endDate: data.endDate
          ? data.endDate.toISOString()
          : singleLeave?.data?.endDate,
        reason: data.reason,
      };

      console.log(updatedData);

      const res = await updateLeave({ id: id, data: updatedData }).unwrap();
      if (res?.success) {
        toast.success(res.message, { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update leave", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title=" Edit leave">
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
              label={"Employee"}
              items={employeeDataForGenerateSelect}
            />

            <DPSelect
              name={"leaveType"}
              label={"Leave type"}
              items={leaveTypeDataForSelect}
            />
            <Stack direction={"row"} gap={2}>
              <DPDatePicker name={"startDate"} label={"Start date"} />

              <DPDatePicker name={"endDate"} label={"End date"} />
            </Stack>

            <DPInput name={"reason"} label={"Reason"} multiline rows={4} />
          </Stack>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: 5,
            }}
          >
            <Button type="submit">Submit</Button>
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

export default EditEmployeeLeaveModal;

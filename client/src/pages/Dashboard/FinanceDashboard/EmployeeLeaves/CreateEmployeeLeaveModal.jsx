/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import DPDatePicker from "../../../../components/form/DPDatePicker";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import { useGetAllEmployeesQuery } from "../../../../redux/api/finance/employeesApi";
import DPLoading from "../../../../components/ui/DPLoading";
import DPSelect from "../../../../components/form/DPSelect";
import { useGetAllLeaveTypesQuery } from "../../../../redux/api/finance/leaveTypesApi";
import { convertDataForSelect } from "../../../../utils/convertDataForSelect";
import { useCreateLeavesMutation } from "../../../../redux/api/finance/leavesApi";
import { toast } from "sonner";

const defaultValues = {
  employee: "",
  leaveType: "",
  startDate: new Date(),
  endDate: new Date(),
  reason: "",
};

const CreateEmployeeLeaveModal = ({ open, setOpen }) => {
  const { data: allEmployee, isLoading } = useGetAllEmployeesQuery({});
  const { data: leaveTypes, isLoading: leaveTypesLoading } =
    useGetAllLeaveTypesQuery({});
  const [createLeaves] = useCreateLeavesMutation();

  if (isLoading || leaveTypesLoading) return <DPLoading />;

  const employeeDataForGenerateSelect = allEmployee?.data?.result.map(
    (employee) => ({
      value: employee._id,
      name: `${employee.firstName} ${employee.lastName}`,
    })
  );
  const leaveTypeDataForSelect = convertDataForSelect(leaveTypes?.data?.result);

  const onSubmit = async (data) => {
    const toastId = toast.loading("Applying for leave...");

    try {
      const leaveData = {
        employee: data.employee,
        leaveType: data.leaveType,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
        reason: data.reason,
      };

      console.log(leaveData);

      const res = await createLeaves(leaveData).unwrap();
      if (res?.success) {
        toast.success(res.message, { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to apply for leave", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Apply for leave">
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

export default CreateEmployeeLeaveModal;

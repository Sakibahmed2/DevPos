/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPSelect from "../../../../components/form/DPSelect";
import DPModal from "../../../../components/modal/DPModal";
import DPLoading from "../../../../components/ui/DPLoading";
import { useGetAllEmployeesQuery } from "../../../../redux/api/finance/employeesApi";
import {
  useGetSinglePayrollsQuery,
  useUpdatePayrollsMutation,
} from "../../../../redux/api/finance/payrollsApi";
import { toast } from "sonner";

const EditPayrollsModal = ({ open, setOpen, id }) => {
  const [isPaid, setIsPaid] = useState(false);
  const { data: allEmployee, isLoading } = useGetAllEmployeesQuery({});
  const { data: singlePayroll, isLoading: payrollsLoading } =
    useGetSinglePayrollsQuery(id);

  const [updatePayrolls] = useUpdatePayrollsMutation();

  if (isLoading || payrollsLoading) return <DPLoading />;

  const employeeForSelect = allEmployee?.data?.result?.map((employee) => ({
    value: employee._id,
    name: `${employee.firstName} ${employee.lastName}`,
  }));

  const defaultValues = {
    employee: singlePayroll?.data?.employee?._id,
    basicSalary: singlePayroll?.data?.basicSalary,
    allowance: singlePayroll?.data?.hraAllowance,
    conveyance: singlePayroll?.data?.conveyance,
    medical: singlePayroll?.data?.medical,
    bonus: singlePayroll?.data?.bonus,
    other: singlePayroll?.data?.other,
    totalDeduction: singlePayroll?.data?.totalDeduction,
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating payroll...");
    const totalAllowance =
      data.allowance + data.conveyance + data.medical + data.bonus + data.other;
    const netSalary = data.basicSalary + totalAllowance - data.totalDeduction;

    try {
      const payrollsData = {
        employee: data.employee,
        basicSalary: data.basicSalary,
        totalDeduction: data.totalDeduction,
        allowance: data.allowance,
        conveyance: data.conveyance,
        medical: data.medical,
        bonus: data.bonus,
        other: data.other,
        totalAllowance,
        netSalary,
        isPaid,
      };

      console.log(payrollsData);

      const res = await updatePayrolls({ id, data: payrollsData }).unwrap();

      if (res?.success) {
        toast.success("Payroll updated", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.err("Failed to update payroll", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal
        open={open}
        setOpen={setOpen}
        title="Edit payrolls"
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
            <DPSelect
              label="Employee"
              name="employee"
              items={employeeForSelect}
            />

            <Typography variant="h6" fontWeight={600}>
              Salary Information
            </Typography>

            <DPInput name="basicSalary" label="Basic Salary" />

            {/* status */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Typography variant="p">Status</Typography>
              <Stack direction={"row"}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isPaid}
                      onChange={() => setIsPaid(!isPaid)}
                    />
                  }
                  label="Paid"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!isPaid}
                      onChange={() => setIsPaid(!isPaid)}
                    />
                  }
                  label="Unpaid"
                />
              </Stack>
            </Box>

            <Typography variant="h6" fontWeight={600}>
              Allowances
            </Typography>
            <Stack direction={"row"} gap={3}>
              <DPInput name="allowance" label="HRA allowance" />
              <DPInput name="conveyance" label="Conveyance" />
              <DPInput name="medical" label="Medical allowance" />
            </Stack>

            <Stack direction={"row"} gap={3}>
              <DPInput name="bonus" label="Bonus" />
              <DPInput name="other" label="Other" />
            </Stack>

            <Typography variant="h6" fontWeight={600}>
              Deductions
            </Typography>
            <Stack direction={"row"} gap={3}>
              <DPInput name="totalDeduction" label="Total Deduction" />
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

export default EditPayrollsModal;

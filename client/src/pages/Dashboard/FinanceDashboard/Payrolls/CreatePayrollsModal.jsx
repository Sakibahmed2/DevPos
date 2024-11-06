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
import { toast } from "sonner";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPSelect from "../../../../components/form/DPSelect";
import DPModal from "../../../../components/modal/DPModal";
import DPLoading from "../../../../components/ui/DPLoading";
import { useGetAllEmployeesQuery } from "../../../../redux/api/finance/employeesApi";
import { useCreatePayrollsMutation } from "../../../../redux/api/finance/payrollsApi";

const defaultValues = {
  employee: "",
  basicSalary: "",
  allowance: "",
  conveyance: "",
  medical: "",
  bonus: "",
  other: "",
  totalDeduction: "",
};

const CreatePayrollsModal = ({ open, setOpen }) => {
  const [isPaid, setIsPaid] = useState(false);
  const { data: allEmployee, isLoading } = useGetAllEmployeesQuery({});
  const [createPayrolls] = useCreatePayrollsMutation();

  if (isLoading) return <DPLoading />;

  const employeeForSelect = allEmployee?.data?.result?.map((employee) => ({
    value: employee._id,
    name: `${employee.firstName} ${employee.lastName}`,
  }));

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating payroll...");
    // Covert to number
    const basicSalary = Number(data.basicSalary);
    const allowance = Number(data.allowance);
    const conveyance = Number(data.conveyance);
    const medical = Number(data.medical);
    const bonus = Number(data.bonus);
    const other = Number(data.other);
    const totalDeduction = Number(data.totalDeduction);

    const totalAllowance = allowance + conveyance + medical + bonus + other;
    const netSalary = basicSalary + totalAllowance - totalDeduction;
    try {
      const payrollsData = {
        employee: data.employee,
        basicSalary,
        totalAllowance,
        hraAllowance: allowance,
        conveyance,
        medical,
        bonus,
        other,
        totalDeduction,
        netSalary,
        isPaid,
      };

      const res = await createPayrolls(payrollsData).unwrap();
      if (res?.success) {
        toast.success("Payroll created", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to create payroll", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal
        open={open}
        setOpen={setOpen}
        title="Create payrolls"
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

export default CreatePayrollsModal;

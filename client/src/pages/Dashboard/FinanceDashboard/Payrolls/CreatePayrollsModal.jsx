/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";

const defaultValues = {
  employee: "",
  basicSalary: "",
  allowance: "",
  conveyance: "",
  medical: "",
  bonus: "",
  other: "",
  totalAllowance: "",
  totalDeduction: "",
  netSalary: "",
};

const CreatePayrollsModal = ({ open, setOpen }) => {
  const onSubmit = (data) => {
    console.log(data);
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
            <Grid2 container gap={3}>
              <Grid2 item size={6}>
                <DPInput label="Employee" name="employee" />
              </Grid2>
            </Grid2>

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
                  control={<Checkbox defaultChecked />}
                  label="Paid"
                />

                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Unpaid"
                />
              </Stack>
            </Box>

            <Typography variant="h6" fontWeight={600}>
              Salary Information
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
              <DPInput name="totalAllowance" label="Total Allowance" />
              <DPInput name="totalDeduction" label="Total Deduction" />
              <DPInput name="netSalary" label="Net Salary" />
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

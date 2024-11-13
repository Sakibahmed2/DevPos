/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import { useState } from "react";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import { useCreateBankAccountMutation } from "../../../../redux/api/finance/bankAccountApi";
import { toast } from "sonner";

const defaultValues = {
  bankName: "",
  accountNumber: "",
  accountName: "",
  branch: "",
  ifscCode: "",
};

const CreateBankAccountModal = ({ open, setOpen }) => {
  const [status, setStatus] = useState("Active");
  const [addBankAccount] = useCreateBankAccountMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Adding bank account...");
    try {
      const bankData = {
        bankName: data.bankName,
        accountNumber: data.accountNumber,
        accountName: data.accountName,
        branch: data.branch,
        ifscCode: data.ifscCode,
        status: status,
      };

      const res = await addBankAccount(bankData).unwrap();

      if (res?.success) {
        toast.success(res?.message, { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to add bank account", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Add bank account">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <DPInput name={"bankName"} label={"Bank name"} />

            <DPInput name={"accountNumber"} label={"Account number"} />

            <DPInput name={"accountName"} label={"Account name"} />

            <DPInput name={"branch"} label={"Branch"} />

            <DPInput name={"ifscCode"} label={"IFSC code"} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
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
            <Button type="submit">Add bank account</Button>
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

export default CreateBankAccountModal;

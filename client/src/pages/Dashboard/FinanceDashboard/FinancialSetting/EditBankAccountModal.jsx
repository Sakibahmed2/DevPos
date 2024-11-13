/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import { useState } from "react";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import {
  useGetSingleBankAccountQuery,
  useUpdateBankAccountMutation,
} from "../../../../redux/api/finance/bankAccountApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { toast } from "sonner";

const EditBankAccountModal = ({ open, setOpen, id }) => {
  const [status, setStatus] = useState("Active");
  const { data: singleBankAccount, isLoading } =
    useGetSingleBankAccountQuery(id);

  const [editBankAccount] = useUpdateBankAccountMutation();

  if (isLoading) return <DPLoading />;

  const defaultValues = {
    bankName: singleBankAccount?.data?.bankName,
    accountNumber: singleBankAccount?.data?.accountNumber,
    accountName: singleBankAccount?.data?.accountName,
    branch: singleBankAccount?.data?.branch,
    ifscCode: singleBankAccount?.data?.ifscCode,
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating bank account...");

    try {
      const updatedData = {
        bankName: data.bankName,
        accountNumber: data.accountNumber,
        accountName: data.accountName,
        branch: data.branch,
        ifscCode: data.ifscCode,
        status: status,
      };

      const res = await editBankAccount({ id, data: updatedData }).unwrap();

      if (res?.success) {
        toast.success("Bank account updated successfully", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update bank account", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Edit bank account">
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
            <Button type="submit">Update bank account</Button>
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

export default EditBankAccountModal;

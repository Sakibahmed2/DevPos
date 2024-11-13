/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from "@mui/material";
import deleteIcon from "../../../../assets/dashboard icons/delete-icon.svg";
import editIcons from "../../../../assets/dashboard icons/edit-icon.svg";
import { useState } from "react";
import EditBankAccountModal from "../../../../pages/Dashboard/FinanceDashboard/FinancialSetting/EditBankAccountModal";
import { useDeleteBankAccountMutation } from "../../../../redux/api/finance/bankAccountApi";
import { toast } from "sonner";

const BankAccountCard = ({ item }) => {
  const [open, setOpen] = useState(false);
  const { _id, bankName, accountNumber, accountName, status } = item || {};
  const [deleteBankAccount] = useDeleteBankAccountMutation();

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting bank account...");

    try {
      const res = await deleteBankAccount(_id).unwrap();

      if (res?.success) {
        toast.success("Bank account deleted successfully", { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete bank account", { id: toastId });
    }
  };

  return (
    <Box
      sx={{
        color: "white",
        bgcolor: "#092C4C",
        padding: "20px",
        borderRadius: 3,
        position: "relative",
      }}
    >
      <Box
        sx={{
          height: 20,
          width: 20,
          bgcolor: status === "Active" ? "primary.main" : "red",
          position: "absolute",
          left: "90%",
          bottom: "81%",
          borderRadius: "50%",
        }}
      ></Box>

      <Typography variant={"h5"}>{bankName}</Typography>
      <Typography
        variant={"subtitle1"}
        sx={{
          color: "white",
          mt: 1,
        }}
      >
        {"*".repeat(accountName.length - 4)}
        {accountNumber.slice(-4)}
      </Typography>

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"end"}
      >
        <Box>
          <Typography
            variant={"subtitle1"}
            sx={{
              color: "white",
              mt: 1,
            }}
          >
            Holder name
          </Typography>
          <Typography
            variant={"subtitle1"}
            sx={{
              color: "white",
            }}
          >
            {accountName}
          </Typography>
        </Box>

        <Box
          component={"button"}
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Box
            onClick={() => setOpen(true)}
            component={"button"}
            sx={{
              bgcolor: "wheat",
              p: 1,
              borderRadius: 1,
            }}
          >
            <img src={editIcons} alt="" className="w-6" />
          </Box>

          <Box
            onClick={handleDelete}
            sx={{
              bgcolor: "wheat",
              p: 1,
              borderRadius: 1,
            }}
          >
            <img src={deleteIcon} alt="" className="w-6" />
          </Box>
        </Box>
      </Stack>

      {/* Edit bank account modal */}
      <EditBankAccountModal open={open} setOpen={setOpen} id={_id} />
    </Box>
  );
};

export default BankAccountCard;

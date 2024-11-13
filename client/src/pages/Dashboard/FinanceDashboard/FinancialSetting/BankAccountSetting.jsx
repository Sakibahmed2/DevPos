import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import plusIcon from "../../../../assets/dashboard icons/plusIcon.svg";
import BankAccountCard from "../../../../components/dashboard/finance/FinancialSetting/BankAccountCard";
import DPLoading from "../../../../components/ui/DPLoading";
import { useGetAllBankAccountQuery } from "../../../../redux/api/finance/bankAccountApi";
import CreateBankAccountModal from "./CreateBankAccountModal";

const BankAccountSetting = () => {
  const [createBankModal, setCreateBankModal] = useState(false);
  const { data: bankAccounts, isLoading } = useGetAllBankAccountQuery({});

  if (isLoading) return <DPLoading />;

  return (
    <Box>
      <Box>
        <Stack
          direction={"row"}
          justifyContent={"end"}
          alignItems={"center"}
          sx={{
            mt: 2,
          }}
        >
          <Button
            onClick={() => setCreateBankModal(true)}
            startIcon={
              <img
                src={plusIcon}
                alt="plus icon"
                style={{ width: 30, height: 30 }}
              />
            }
          >
            Add bank account
          </Button>
        </Stack>

        {/* Bank account list */}

        <div className="grid grid-cols-3 gap-3 mt-4">
          {bankAccounts?.data?.result?.map((item) => (
            <BankAccountCard key={item._id} item={item} />
          ))}
        </div>
      </Box>

      {/* Add bank account modal */}
      <CreateBankAccountModal
        open={createBankModal}
        setOpen={setCreateBankModal}
      />
    </Box>
  );
};

export default BankAccountSetting;

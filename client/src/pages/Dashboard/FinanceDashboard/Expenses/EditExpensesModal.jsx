/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import DPForm from "../../../../components/form/DPForm";
import DPDatePicker from "../../../../components/form/DPDatePicker";
import { useState } from "react";
import {
  useGetSingleExpensesQuery,
  useUpdateExpensesMutation,
} from "../../../../redux/api/finance/expensesApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { toast } from "sonner";
import { useGetAllExpenseCategoriesQuery } from "../../../../redux/api/finance/expenseCategoriesApi";
import { convertDataForSelect } from "../../../../utils/convertDataForSelect";
import DPSelect from "../../../../components/form/DPSelect";

const EditExpensesModal = ({ open, setOpen, id }) => {
  const [status, setStatus] = useState("Active");
  const { data: singleExpense, isLoading } = useGetSingleExpensesQuery(id);
  const { data: expenseCategory, isLoading: expenseCategoryLoading } =
    useGetAllExpenseCategoriesQuery({});
  const [updateExpenses] = useUpdateExpensesMutation();

  const expenseCategoryForSelect = convertDataForSelect(
    expenseCategory?.data?.result
  );

  if (isLoading || expenseCategoryLoading) {
    return <DPLoading />;
  }

  const defaultValue = {
    expenseCategory: singleExpense?.data?.expenseCategory._id,
    date: singleExpense?.data?.date,
    amount: singleExpense?.data?.amount,
    reference: singleExpense?.data?.refNo,
    expenseFor: singleExpense?.data?.expenseFor,
    description: singleExpense?.data?.description,
    status: singleExpense?.data?.status,
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating expenses...");
    try {
      const updatedData = {
        expenseCategory: data.categoryName,
        date: data.date,
        amount: data.amount,
        refNo: data.reference,
        expenseFor: data.expenseFor,
        description: data.description,
        status: status,
      };

      const res = await updateExpenses({
        id: id,
        data: updatedData,
      }).unwrap();

      if (res?.success) {
        toast.success(res?.message, { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error in updating expenses", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Edit expenses">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValue}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <Stack direction={"row"} gap={3}>
              <DPSelect
                name={"expenseCategory"}
                label={"Expenses category"}
                items={expenseCategoryForSelect}
              />
              <DPDatePicker name={"date"} label={"Date"} />
            </Stack>

            <Stack direction={"row"} gap={3}>
              <DPInput name={"amount"} label={"Amount"} />
              <DPInput name={"reference"} label={"Reference"} />
            </Stack>

            <DPInput name={"expenseFor"} label={"Expanse for"} />

            <DPInput
              name={"description"}
              label={"Description"}
              multiline
              rows={4}
            />

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

export default EditExpensesModal;

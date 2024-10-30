/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import DPDatePicker from "../../../../components/form/DPDatePicker";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import { useGetAllExpenseCategoriesQuery } from "../../../../redux/api/finance/expenseCategoriesApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { convertDataForSelect } from "../../../../utils/convertDataForSelect";
import DPSelect from "../../../../components/form/DPSelect";
import {
  useCreateExpensesMutation,
  useGetAllExpensesQuery,
} from "../../../../redux/api/finance/expensesApi";
import { toast } from "sonner";

const defaultValues = {
  expenseCategory: "",
  date: "",
  amount: "",
  refNo: "",
  expenseFor: "",
  description: "",
};

const CreateExpanseModal = ({ open, setOpen }) => {
  const { data: expanseCategory, isLoading } = useGetAllExpenseCategoriesQuery(
    {}
  );
  const { data: expensesData } = useGetAllExpensesQuery({});
  const [createExpanses] = useCreateExpensesMutation();

  if (isLoading) return <DPLoading />;

  const expanseCategoryForSelect = convertDataForSelect(
    expanseCategory?.data?.result
  );

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating expenses...");
    try {
      // check if refNo already exists
      const isRefNoExists = expensesData?.data?.result?.find(
        (item) => item.refNo === data.refNo
      );
      if (isRefNoExists) {
        toast.error("Reference number already exists ", { id: toastId });
        return;
      }
      const res = await createExpanses(data).unwrap();

      if (res?.success) {
        toast.success("Expenses created successfully", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.message, { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Add expenses">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
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
                items={expanseCategoryForSelect}
              />
              <DPDatePicker name={"date"} label={"Date"} />
            </Stack>

            <Stack direction={"row"} gap={3}>
              <DPInput name={"amount"} label={"Amount"} />
              <DPInput name={"refNo"} label={"Reference"} />
            </Stack>

            <DPInput name={"expenseFor"} label={"Expanse for"} />

            <DPInput
              name={"description"}
              label={"Description"}
              multiline
              rows={4}
            />
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

export default CreateExpanseModal;

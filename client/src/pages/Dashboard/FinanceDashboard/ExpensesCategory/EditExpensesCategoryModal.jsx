/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import {
  useGetSingleExpenseCategoriesQuery,
  useUpdateExpenseCategoriesMutation,
} from "../../../../redux/api/finance/expenseCategoriesApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { toast } from "sonner";

const EditExpensesCategoryModal = ({ open, setOpen, id }) => {
  const { data: singleExpenseCategory, isLoading } =
    useGetSingleExpenseCategoriesQuery(id);

  const [updateExpenseCategory] = useUpdateExpenseCategoriesMutation();
  if (isLoading) {
    return <DPLoading />;
  }

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating expenses category");

    try {
      const res = await updateExpenseCategory({
        expenseCategoryId: id,
        expenseCategoryData: data,
      }).unwrap();

      if (res.success) {
        toast.success("Expenses category updated successfully", {
          id: toastId,
        });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update expenses category", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Edit expenses category">
        <DPForm onSubmit={onSubmit} defaultValue={singleExpenseCategory?.data}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <DPInput name={"name"} label={"Expenses category"} />
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

export default EditExpensesCategoryModal;

/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import { useCreateExpenseCategoriesMutation } from "../../../../redux/api/finance/expenseCategoriesApi";
import { toast } from "sonner";

const defaultValues = {
  name: "",
  description: "",
};

const CreateExpensesCategoryModal = ({ open, setOpen }) => {
  const [createExpanseCategory] = useCreateExpenseCategoriesMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating expenses category");
    try {
      const res = await createExpanseCategory(data).unwrap();

      if (res.success) {
        toast.success("Expenses category created successfully", {
          id: toastId,
        });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to create expenses category", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Add expenses category">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
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

export default CreateExpensesCategoryModal;

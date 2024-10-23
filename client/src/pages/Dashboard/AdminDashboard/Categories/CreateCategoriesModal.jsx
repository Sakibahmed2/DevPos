/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import { useCreateCategoriesMutation } from "../../../../redux/api/admin/categoriesApi";
import { toast } from "sonner";

const defaultValues = {
  name: "",
  categorySlug: "",
};

const CreateCategoriesModal = ({ open, setOpen }) => {
  const [createCategories] = useCreateCategoriesMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating category");
    try {
      const res = await createCategories(data).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DPModal title="Create category" open={open} setOpen={setOpen}>
      <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
        <Stack
          direction={"column"}
          gap={3}
          sx={{
            width: "500px",
          }}
        >
          <DPInput
            name={"name"}
            label={"Category name"}
            fullWidth
            size="medium"
          />
          <DPInput
            name={"categorySlug"}
            label={"Category slug"}
            fullWidth
            size="medium"
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
          <Button type="submit">Add category</Button>
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
  );
};

export default CreateCategoriesModal;

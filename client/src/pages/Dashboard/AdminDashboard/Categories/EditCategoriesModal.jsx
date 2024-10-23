/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPModal from "../../../../components/modal/DPModal";
import DPInput from "../../../../components/form/DPInput";
import { useState } from "react";
import {
  useGetSingleCategoryQuery,
  useUpdateCategoriesMutation,
} from "../../../../redux/api/admin/categoriesApi";
import { toast } from "sonner";

const EditCategoriesModal = ({ open, setOpen, id }) => {
  const [status, setStatus] = useState("Active");
  const { data: categoryData } = useGetSingleCategoryQuery(id);
  const [updateCategory] = useUpdateCategoriesMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating category");
    try {
      const res = await updateCategory({
        categoryId: id,
        categoryData: data,
      }).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DPModal title="Edit category" open={open} setOpen={setOpen}>
      <DPForm onSubmit={onSubmit} defaultValue={categoryData?.data}>
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
                setStatus((prev) => (prev === "Active" ? "Inactive" : "Active"))
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
  );
};

export default EditCategoriesModal;

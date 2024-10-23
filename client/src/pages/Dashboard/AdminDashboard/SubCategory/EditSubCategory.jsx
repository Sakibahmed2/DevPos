/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import { useState } from "react";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPSelect from "../../../../components/form/DPSelect";
import DPModal from "../../../../components/modal/DPModal";
import { useGetAllCategoriesQuery } from "../../../../redux/api/admin/categoriesApi";
import {
  useGetSingleSubCategoriesQuery,
  useUpdateSubCategoriesMutation,
} from "../../../../redux/api/admin/subCategoriesApi";
import { convertDataForSelect } from "../../../../utils/convertDataForSelect";
import { toast } from "sonner";

const EditSubCategory = ({ open, setOpen, id }) => {
  const [status, setStatus] = useState("Active");
  const { data: singleSubCategory, isLoading } =
    useGetSingleSubCategoriesQuery(id);
  const { data: categoriesData } = useGetAllCategoriesQuery({});
  const categoriesForSelect = convertDataForSelect(
    categoriesData?.data?.result
  );
  const [updateSubCategory] = useUpdateSubCategoriesMutation();

  if (isLoading) return <p>Loading...</p>;

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating category");
    try {
      const subCategoryData = {
        name: data.name,
        code: data.code,
        description: data.description,
        parentCategory: data.parentCategory,
        status: status,
      };

      const res = await updateSubCategory({
        categoryId: id,
        categoryData: subCategoryData,
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
    <DPModal title="Edit sub category" open={open} setOpen={setOpen}>
      <DPForm onSubmit={onSubmit} defaultValue={singleSubCategory?.data}>
        <Stack
          direction={"column"}
          gap={3}
          sx={{
            width: "500px",
          }}
        >
          <DPSelect
            name={"parentCategory"}
            label={"Parent category"}
            items={categoriesForSelect}
          />

          <DPInput name={"name"} label={"Category name"} />

          <DPInput name={"code"} label={"Category code"} />

          <DPInput
            name={"description"}
            label={"Description"}
            fullWidth
            multiline
            rows={3}
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

export default EditSubCategory;

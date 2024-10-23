/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPSelect from "../../../../components/form/DPSelect";
import DPModal from "../../../../components/modal/DPModal";
import { useGetAllCategoriesQuery } from "../../../../redux/api/admin/categoriesApi";
import { convertDataForSelect } from "../../../../utils/convertDataForSelect";
import { useCreateSubCategoriesMutation } from "../../../../redux/api/admin/subCategoriesApi";
import { toast } from "sonner";
import { getUserInfo } from "../../../../utils/getUserInfo";

const defaultValues = {
  parentCategory: "",
  name: "",
  code: "",
  description: "",
};

const CreateSubCategoryModal = ({ open, setOpen }) => {
  const { data: categoriesData } = useGetAllCategoriesQuery({});
  const categoriesForSelect = convertDataForSelect(
    categoriesData?.data?.result
  );
  const [createSubCategories] = useCreateSubCategoriesMutation();
  const userInfo = getUserInfo();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating sub category...");
    try {
      const subCategoryData = {
        name: data.name,
        code: data.code,
        description: data.description,
        parentCategory: data.parentCategory,
        createdBy: userInfo.id,
      };

      const res = await createSubCategories(subCategoryData).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DPModal title="Create sub category" open={open} setOpen={setOpen}>
      <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
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
            multiline
            rows={3}
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
          <Button type="submit">Add sub category</Button>
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

export default CreateSubCategoryModal;

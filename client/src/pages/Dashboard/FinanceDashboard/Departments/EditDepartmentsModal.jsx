/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import DPFileUploader from "../../../../components/form/DPFileUploader";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import {
  useGetSingleDepartmentsQuery,
  useUpdateDepartmentsMutation,
} from "../../../../redux/api/finance/departmentsApi";
import DPLoading from "../../../../components/ui/DPLoading";
import convertImgToBase64 from "../../../../utils/convertImgToBase64";
import { toast } from "sonner";

const EditDepartmentsModal = ({ open, setOpen, id }) => {
  const { data: singleDepartment, isLoading } =
    useGetSingleDepartmentsQuery(id);

  const [updateDepartment] = useUpdateDepartmentsMutation();

  if (isLoading) return <DPLoading />;

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating department...");
    let base64Img = singleDepartment?.data?.img;

    if (data.img instanceof Blob) {
      base64Img = await convertImgToBase64(data.img);
    }

    try {
      const updatedData = {
        name: data.name,
        HOD: data.HOD,
        description: data.description,
        img: base64Img,
      };

      const res = await updateDepartment({
        id: id,
        data: updatedData,
      }).unwrap();

      if (res?.success) {
        toast.success("Department updated successfully", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update department", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Edit department">
        <DPForm onSubmit={onSubmit} defaultValue={singleDepartment?.data}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <DPFileUploader name={"img"} label={"Add image"} />

            <DPInput name={"name"} label={"Department"} />
            <DPInput name={"HOD"} label={"HOD"} />
            <DPInput name={"description"} label={"Description"} />
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

export default EditDepartmentsModal;

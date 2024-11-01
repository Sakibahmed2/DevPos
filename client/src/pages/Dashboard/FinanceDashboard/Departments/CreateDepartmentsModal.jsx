/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import DPFileUploader from "../../../../components/form/DPFileUploader";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import { toast } from "sonner";
import { useCreateDepartmentsMutation } from "../../../../redux/api/finance/departmentsApi";
import convertImgToBase64 from "../../../../utils/convertImgToBase64";

const defaultValues = {
  name: "",
  img: "",
  HOD: "",
  description: "",
};

const CreateDepartmentsModal = ({ open, setOpen }) => {
  const [createDepartments] = useCreateDepartmentsMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating department...");
    const base64Img = await convertImgToBase64(data.img);
    try {
      const departmentData = {
        name: data.name,
        img: base64Img,
        HOD: data.HOD,
        description: data.description,
      };

      const res = await createDepartments(departmentData).unwrap();

      if (res?.success) {
        toast.success("Department created successfully", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to create department", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Add new department">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
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

export default CreateDepartmentsModal;

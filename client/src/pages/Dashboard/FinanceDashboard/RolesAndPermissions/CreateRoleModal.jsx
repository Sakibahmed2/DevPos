/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import { useCreateRolesMutation } from "../../../../redux/api/finance/roleApi";
import { toast } from "sonner";

const defaultValues = {
  name: "",
};

const CreateRoleModal = ({ open, setOpen }) => {
  const [createRole] = useCreateRolesMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating role...");
    try {
      const roleData = {
        name: data.name,
      };

      const res = await createRole(roleData).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to create role", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Add role">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <DPInput name={"name"} label={"Role name"} />
          </Stack>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: 5,
            }}
          >
            <Button type="submit">SUbmit</Button>
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

export default CreateRoleModal;

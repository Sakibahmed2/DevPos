/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import {
  useGetSingleRolesQuery,
  useUpdateRolesMutation,
} from "../../../../redux/api/finance/roleApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { toast } from "sonner";

const EditRoleModal = ({ open, setOpen, id }) => {
  const { data: singleRole, isLoading } = useGetSingleRolesQuery(id);
  const [updateRole] = useUpdateRolesMutation();

  if (isLoading) return <DPLoading />;

  const defaultValues = {
    name: singleRole?.data?.name,
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating role...");

    try {
      const updatedData = {
        name: data.name,
      };

      const res = await updateRole({ id: id, data: updatedData }).unwrap();

      if (res?.success) {
        toast.success(res?.message, { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update role", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Edit role">
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

export default EditRoleModal;
